/** Must stay in sync with the `scope` query on `/api/auth/github` (authorize redirect). */
export const GITHUB_OAUTH_APP_REQUESTED_SCOPES = ['repo', 'read:user'] as const

export function githubOAuthAuthorizeScopeQueryValue(): string {
    return GITHUB_OAUTH_APP_REQUESTED_SCOPES.join(' ')
}
