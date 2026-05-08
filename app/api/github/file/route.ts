import { NextRequest, NextResponse } from 'next/server'
import {
    fetchRepoFileContents,
    messageFromGithubRestError,
    putRepoFileContents,
    resolveRepoForContentsWrite,
} from 'src/lib/server/github-rest'
import { getOctokitFromCookieSession } from 'src/lib/server/octokit-session'
import { prepareInboundSnapshot } from 'src/lib/github-sync/pipeline'

/** Narrow whether GitHub rejected repo lookup vs Contents commit for debugging support IDs and SSO/rulesets. */
type GithubPutPhase = 'repository_metadata' | 'contents_write'

function jsonGithubPutFailure(e: unknown, phase: GithubPutPhase): NextResponse {
    const reqErr = e as { status?: number; response?: { status?: number } }
    const status = reqErr.status ?? reqErr.response?.status ?? 500
    let msg = messageFromGithubRestError(e)

    const phaseHint =
        phase === 'repository_metadata'
            ? 'Fails during GET /repos/{owner}/{repo}. Org SSO / third‑party app restrictions often surface here.'
            : 'Fails during Contents API commit even though repo metadata was readable — SSO restrictions or Rulesets/branch protection blocking commits are common.'

    if (
        typeof msg === 'string' &&
        msg.includes('Resource not accessible by integration')
    ) {
        msg +=
            ' — Your token usually cannot use GitHub’s REST API on this repo. Checklist: (1) Use credentials from Developer settings → OAuth Apps (not GitHub Apps). (2) Revoke under Settings → Applications → Authorized OAuth Apps, reconnect, approve full repo scope for private repos. (3) Organization repos: org must allow this app; then Authorized OAuth Apps → this app → grant/configure SSO if SAML is used — https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-an-oauth-app-for-use-with-saml-single-sign-on (similar flow on Enterprise/Fabric where SSO applies). (4) Correct Owner/Repo and account must have push access.'
        if (phase === 'contents_write') {
            msg +=
                ' (5) If repo lookup succeeds only commits fail: check Rulesets and branch protection on the default branch — admins may need to allow Contents commits / bypass.'
        }
    }

    return NextResponse.json(
        {
            ok: false,
            error: msg,
            githubPhase: phase,
            githubPhaseHint: phaseHint,
        },
        { status: status >= 400 ? status : 500 }
    )
}

export async function GET(req: NextRequest) {
    const octokit = await getOctokitFromCookieSession()
    if (!octokit) {
        return NextResponse.json({ ok: false, error: 'Not authenticated with GitHub' }, { status: 401 })
    }

    const owner = req.nextUrl.searchParams.get('owner')
    const repo = req.nextUrl.searchParams.get('repo')
    const path = req.nextUrl.searchParams.get('path')
    if (!owner || !repo || !path) {
        return NextResponse.json({ ok: false, error: 'owner, repo, path required' }, { status: 400 })
    }

    try {
        const file = await fetchRepoFileContents({ octokit, owner, repo, path })
        if (!file) {
            return NextResponse.json({ ok: true, exists: false })
        }
        let parsed: unknown
        try {
            parsed = JSON.parse(file.content)
        } catch {
            return NextResponse.json({ ok: false, error: 'Remote file is not valid JSON' }, { status: 422 })
        }
        return NextResponse.json({
            ok: true,
            exists: true,
            snapshot: parsed,
            sha: file.sha,
        })
    } catch (e: unknown) {
        const reqErr = e as { status?: number; response?: { status?: number } }
        const status = reqErr.status ?? reqErr.response?.status ?? 500
        const msg = messageFromGithubRestError(e)
        return NextResponse.json({ ok: false, error: msg }, { status: status >= 400 ? status : 500 })
    }
}

export async function PUT(req: NextRequest) {
    const octokit = await getOctokitFromCookieSession()
    if (!octokit) {
        return NextResponse.json({ ok: false, error: 'Not authenticated with GitHub' }, { status: 401 })
    }

    const body = (await req.json()) as {
        owner?: string
        repo?: string
        path?: string
        snapshot?: unknown
        sha?: string
    }

    if (!body.owner || !body.repo || !body.path || body.snapshot == null) {
        return NextResponse.json({ ok: false, error: 'owner, repo, path, snapshot required' }, { status: 400 })
    }

    const prepared = prepareInboundSnapshot(body.snapshot)
    if (!prepared.ok) {
        return NextResponse.json({ ok: false, error: prepared.error }, { status: 400 })
    }

    try {
        const { defaultBranch } = await resolveRepoForContentsWrite({
            octokit,
            owner: body.owner,
            repo: body.repo,
        })
        try {
            await putRepoFileContents({
                octokit,
                owner: body.owner,
                repo: body.repo,
                path: body.path,
                message: 'Sync kanban data',
                snapshot: prepared.snapshot,
                sha: body.sha,
                branch: defaultBranch,
            })
            return NextResponse.json({ ok: true })
        } catch (e: unknown) {
            return jsonGithubPutFailure(e, 'contents_write')
        }
    } catch (e: unknown) {
        return jsonGithubPutFailure(e, 'repository_metadata')
    }
}
