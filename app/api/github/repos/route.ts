import { NextRequest, NextResponse } from 'next/server'
import { getOctokitFromCookieSession } from 'src/lib/server/octokit-session'

export async function GET() {
    const octokit = await getOctokitFromCookieSession()
    if (!octokit) {
        return NextResponse.json({ ok: false, error: 'Not authenticated with GitHub' }, { status: 401 })
    }

    const { data } = await octokit.rest.repos.listForAuthenticatedUser({
        per_page: 100,
        sort: 'updated',
    })

    return NextResponse.json({
        ok: true,
        repos: data.map((r) => ({ name: r.name, fullName: r.full_name, private: r.private })),
    })
}

export async function POST(req: NextRequest) {
    const octokit = await getOctokitFromCookieSession()
    if (!octokit) {
        return NextResponse.json({ ok: false, error: 'Not authenticated with GitHub' }, { status: 401 })
    }

    const body = (await req.json()) as { name?: string; private?: boolean }
    if (!body.name?.trim()) {
        return NextResponse.json({ ok: false, error: 'Repository name required' }, { status: 400 })
    }

    const created = await octokit.rest.repos.createForAuthenticatedUser({
        name: body.name.trim(),
        private: body.private ?? true,
        auto_init: true,
    })

    return NextResponse.json({
        ok: true,
        owner: created.data.owner.login,
        repo: created.data.name,
        fullName: created.data.full_name,
    })
}
