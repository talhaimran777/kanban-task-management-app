import { Octokit } from 'octokit'
import { getSession } from 'src/lib/server/session'

export async function getOctokitFromCookieSession(): Promise<Octokit | null> {
    const session = await getSession()
    if (!session.accessToken) {
        return null
    }
    return new Octokit({ auth: session.accessToken })
}
