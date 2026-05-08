import { getIronSession, IronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'

export type GitHubSession = IronSession<SessionData>

export type SessionData = {
    accessToken?: string
    login?: string
    /** Scopes from OAuth token exchange (`scope` in JSON). Fallback when API omits `x-oauth-scopes`. */
    grantedOAuthScopes?: string[]
}

const sessionOptions: SessionOptions = {
    password: process.env.IRON_SESSION_PASSWORD ?? '',
    cookieName: 'kanban_github_session',
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
    },
}

export async function getSession(): Promise<GitHubSession> {
    return getIronSession<SessionData>(cookies(), sessionOptions)
}

export function assertSessionConfigured(): void {
    const pwd = process.env.IRON_SESSION_PASSWORD ?? ''
    if (pwd.length < 32) {
        console.warn(
            '[kanban] IRON_SESSION_PASSWORD must be at least 32 characters for iron-session.'
        )
    }
}
