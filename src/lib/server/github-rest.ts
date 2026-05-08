import { Octokit } from 'octokit'
import type { Snapshot } from 'src/lib/github-sync/schema'

function getGithubRequestStatus(e: unknown): number | undefined {
    const err = e as { status?: number; response?: { status?: number } }
    return err.status ?? err.response?.status
}

/** Prefer REST JSON message (+ optional GitHub request id) over generic wrapper text. */
export function messageFromGithubRestError(e: unknown): string {
    const err = e as {
        message?: string
        response?: {
            data?: { message?: string }
            headers?: { [key: string]: string | undefined } | Headers
        }
    }
    const apiMsg = err.response?.data?.message
    const base =
        typeof apiMsg === 'string' && apiMsg.trim() ? apiMsg.trim() : (e instanceof Error ? e.message : String(e))

    let rid: string | undefined
    const h = err.response?.headers
    if (h instanceof Headers) {
        rid = h.get('x-github-request-id') ?? undefined
    } else if (h && typeof h === 'object') {
        const rec = h as Record<string, string | undefined>
        rid =
            rec['x-github-request-id'] ??
            rec['X-GitHub-Request-Id']
    }

    if (rid && !base.includes(rid)) {
        return `${base} (GitHub request id: ${rid})`
    }
    return base
}

/**
 * Fail fast when the repo is missing or read-only; returns default branch for Contents API.
 * Org SSO / OAuth-app restrictions often surface as 403 here or on the next write.
 */
export async function resolveRepoForContentsWrite(params: {
    octokit: Octokit
    owner: string
    repo: string
}): Promise<{ defaultBranch?: string }> {
    try {
        const { data } = await params.octokit.rest.repos.get({
            owner: params.owner,
            repo: params.repo,
        })
        const p = data.permissions
        const canWrite = !!(p?.admin || p?.maintain || p?.push)
        if (!canWrite) {
            throw Object.assign(
                new Error(
                    `No push permission on ${params.owner}/${params.repo}. Sync needs write access — use a repo you own, a fork under your account, or one where you are a collaborator with push access (not read-only).`
                ),
                { status: 403 }
            )
        }
        const db = data.default_branch
        return { defaultBranch: typeof db === 'string' && db.length > 0 ? db : undefined }
    } catch (e: unknown) {
        const status = getGithubRequestStatus(e)
        if (status === 404) {
            throw Object.assign(
                new Error(
                    `Repository not found: ${params.owner}/${params.repo}. Check Owner and Repository (names are case-sensitive).`
                ),
                { status: 404 }
            )
        }
        throw e
    }
}

export async function fetchRepoFileContents(params: {
    octokit: Octokit
    owner: string
    repo: string
    path: string
}): Promise<{ content: string; sha: string } | null> {
    try {
        const res = await params.octokit.rest.repos.getContent({
            owner: params.owner,
            repo: params.repo,
            path: params.path,
        })
        const data = res.data as {
            content?: string
            sha?: string
            encoding?: string
        }
        if (!data.content || !data.sha) {
            return null
        }
        const raw = Buffer.from(data.content, 'base64').toString('utf8')
        return { content: raw, sha: data.sha }
    } catch (e: unknown) {
        const status = getGithubRequestStatus(e)
        if (status === 404) {
            return null
        }
        throw e
    }
}

export async function putRepoFileContents(params: {
    octokit: Octokit
    owner: string
    repo: string
    path: string
    message: string
    snapshot: Snapshot
    sha?: string
    /** Explicit branch avoids ambiguous default-branch edge cases on GitHub’s side. */
    branch?: string
}): Promise<void> {
    const json = JSON.stringify(params.snapshot, null, 2)
    const contentBase64 = Buffer.from(json, 'utf8').toString('base64')

    await params.octokit.rest.repos.createOrUpdateFileContents({
        owner: params.owner,
        repo: params.repo,
        path: params.path,
        message: params.message,
        content: contentBase64,
        sha: params.sha,
        ...(params.branch ? { branch: params.branch } : {}),
    })
}
