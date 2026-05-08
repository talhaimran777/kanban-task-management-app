import { NextResponse } from 'next/server'
import { GITHUB_OAUTH_APP_REQUESTED_SCOPES } from 'src/lib/server/github-oauth-app-scopes'
import { getSession } from 'src/lib/server/session'

/** Headers GitHub sends for classic OAuth tokens (helps debug 403 contents writes). */
async function fetchOAuthScopes(accessToken: string): Promise<{
    scopes: string[]
    githubStatus: number
}> {
    const res = await fetch('https://api.github.com/user', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        },
    })
    const raw = res.headers.get('x-oauth-scopes') ?? ''
    const scopes = raw
        .split(/[,\s]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    return { scopes, githubStatus: res.status }
}

export async function GET() {
    const session = await getSession()
    const loggedIn = !!(session.accessToken && session.login)

    let oauthScopes: string[] = []
    let repoScopeGranted = false
    let publicRepoScopeOnly = false
    let scopeCheckStatus: number | undefined

    if (session.accessToken && loggedIn) {
        const check = await fetchOAuthScopes(session.accessToken)
        scopeCheckStatus = check.githubStatus
        // Prefer API header; GitHub sometimes omits x-oauth-scopes — use scopes from token exchange.
        oauthScopes =
            check.scopes.length > 0 ? check.scopes : session.grantedOAuthScopes ?? []
        repoScopeGranted = oauthScopes.includes('repo')
        publicRepoScopeOnly =
            oauthScopes.includes('public_repo') && !oauthScopes.includes('repo')
    }

    const scopesUnknown =
        loggedIn &&
        scopeCheckStatus === 200 &&
        oauthScopes.length === 0

    return NextResponse.json({
        ok: true,
        loggedIn,
        login: session.login ?? null,
        oauthScopes,
        repoScopeGranted,
        publicRepoScopeOnly,
        scopeCheckStatus,
        scopesUnknown,
        appRequestedScopes: [...GITHUB_OAUTH_APP_REQUESTED_SCOPES],
    })
}
