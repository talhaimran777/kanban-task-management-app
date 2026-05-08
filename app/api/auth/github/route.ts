import { NextResponse } from 'next/server'
import { githubOAuthAuthorizeScopeQueryValue } from 'src/lib/server/github-oauth-app-scopes'

export async function GET() {
    const clientId = process.env.GITHUB_CLIENT_ID
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'
    if (!clientId) {
        return NextResponse.json({ ok: false, error: 'GITHUB_CLIENT_ID missing' }, { status: 500 })
    }

    const redirectUri = `${baseUrl.replace(/\/$/, '')}/api/auth/github/callback`
    /// Full private repo access including Contents API writes. `public_repo` alone is not enough for private repos.
    const scope = encodeURIComponent(githubOAuthAuthorizeScopeQueryValue())
    const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
        redirectUri
    )}&scope=${scope}`

    return NextResponse.redirect(url)
}
