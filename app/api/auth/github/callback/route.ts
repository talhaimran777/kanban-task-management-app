import { Octokit } from 'octokit'
import { NextRequest, NextResponse } from 'next/server'
import { getSession } from 'src/lib/server/session'

export async function GET(req: NextRequest) {
    const code = req.nextUrl.searchParams.get('code')
    if (!code) {
        return NextResponse.redirect(new URL('/?github=denied', req.url))
    }

    const clientId = process.env.GITHUB_CLIENT_ID
    const clientSecret = process.env.GITHUB_CLIENT_SECRET
    if (!clientId || !clientSecret) {
        return NextResponse.json({ ok: false, error: 'GitHub OAuth env missing' }, { status: 500 })
    }

    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code,
        }),
    })

    const tokenJson = (await tokenRes.json()) as {
        access_token?: string
        scope?: string
        error?: string
    }

    if (!tokenJson.access_token) {
        return NextResponse.redirect(
            new URL(`/?github=error&message=${encodeURIComponent(tokenJson.error ?? 'oauth')}`, req.url)
        )
    }

    const octokit = new Octokit({ auth: tokenJson.access_token })
    const user = await octokit.rest.users.getAuthenticated()

    const grantedOAuthScopes = (tokenJson.scope ?? '')
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean)

    const session = await getSession()
    session.accessToken = tokenJson.access_token
    session.login = user.data.login
    session.grantedOAuthScopes = grantedOAuthScopes.length ? grantedOAuthScopes : undefined
    await session.save()

    return NextResponse.redirect(new URL('/?github=connected', req.url))
}
