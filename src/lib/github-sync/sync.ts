'use client'

import { appendJournalEvent } from './journal'
import { mergeSnapshots } from './merge'
import { prepareInboundSnapshot } from './pipeline'
import type { Snapshot } from './schema'
import { emptySnapshot } from './schema'
import { applySnapshot } from './hydration'
import { exportSnapshot } from './snapshot'
import { validateSnapshot } from './validation'
import useGitHubRepoSettings from 'src/store/github-settings'
import useSyncCoordinator from 'src/store/sync'

export const SYNC_DEBOUNCE_MS = 8000
export const MIN_SYNC_INTERVAL_MS = 20000
const MAX_PUSH_RETRIES = 5

function cloneSnap(s: Snapshot): Snapshot {
    return JSON.parse(JSON.stringify(s))
}

async function fetchRepoPayload(owner: string, repo: string, path: string) {
    const q = new URLSearchParams({ owner, repo, path })
    const res = await fetch(`/api/github/file?${q.toString()}`, { credentials: 'include' })
    const json = (await res.json()) as {
        ok?: boolean
        exists?: boolean
        snapshot?: Snapshot | null
        sha?: string
        error?: string
    }
    if (!res.ok || json.ok === false) {
        throw new Error(json.error ?? `GitHub fetch failed (${res.status})`)
    }
    return json
}

async function pushRepoPayload(body: {
    owner: string
    repo: string
    path: string
    snapshot: Snapshot
    sha?: string
}) {
    const res = await fetch(`/api/github/file`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    const json = (await res.json()) as { ok?: boolean; error?: string }
    if (!res.ok || json.ok === false) {
        const err = new Error(json.error ?? `GitHub push failed (${res.status})`)
        ;(err as Error & { status?: number }).status = res.status
        throw err
    }
}

let syncFlight: Promise<void> | null = null

export function syncSingleFlight(fn: () => Promise<void>): Promise<void> {
    if (!syncFlight) {
        syncFlight = fn().finally(() => {
            syncFlight = null
        })
    }
    return syncFlight
}

export async function syncWithGitHub(options: { manual?: boolean } = {}): Promise<void> {
    const coord = useSyncCoordinator.getState()
    const { owner, repo, path } = useGitHubRepoSettings.getState()

    if (!owner || !repo || !path) {
        coord.setSyncStatus('error', 'Configure GitHub repository owner, name, and file path.')
        appendJournalEvent({ type: 'sync_failed', details: { reason: 'missing_repo_settings' } })
        return
    }

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
        coord.setSyncStatus('offline')
        appendJournalEvent({ type: 'sync_failed', details: { reason: 'offline' } })
        return
    }

    await syncSingleFlight(async () => {
        appendJournalEvent({
            type: 'sync_started',
            details: { manual: !!options.manual },
        })
        coord.setSyncing(true)
        coord.setSyncStatus('syncing')

        const backup = cloneSnap(exportSnapshot())
        const base = coord.lastSyncedSnapshot ?? undefined

        try {
            const payload = await fetchRepoPayload(owner, repo, path)

            let remoteSnap: Snapshot
            if (!payload.exists || payload.snapshot == null) {
                remoteSnap = emptySnapshot()
            } else {
                const prep = prepareInboundSnapshot(payload.snapshot)
                if (!prep.ok) {
                    coord.setSyncStatus('error', prep.error)
                    appendJournalEvent({ type: 'sync_failed', details: { remoteInvalid: prep.error } })
                    return
                }
                remoteSnap = prep.snapshot
            }

            let merged = mergeSnapshots(backup, remoteSnap, base)
            const valMerged = validateSnapshot(merged)
            if (!valMerged.success) {
                coord.setSyncStatus('error', valMerged.error)
                appendJournalEvent({ type: 'sync_failed', details: { mergedInvalid: valMerged.error } })
                return
            }
            merged = valMerged.data

            applySnapshot(merged)

            let sha = payload.sha
            let pushSnapshot = cloneSnap(merged)
            let pushedOk = false

            for (let attempt = 0; attempt < MAX_PUSH_RETRIES; attempt++) {
                try {
                    await pushRepoPayload({
                        owner,
                        repo,
                        path,
                        snapshot: pushSnapshot,
                        sha,
                    })
                    pushedOk = true
                    break
                } catch (e: unknown) {
                    const status = (e as { status?: number }).status
                    if (status === 409 || status === 422) {
                        const fresh = await fetchRepoPayload(owner, repo, path)
                        if (!fresh.exists || fresh.snapshot == null) {
                            remoteSnap = emptySnapshot()
                        } else {
                            const prep = prepareInboundSnapshot(fresh.snapshot)
                            if (!prep.ok) {
                                throw new Error(prep.error)
                            }
                            remoteSnap = prep.snapshot
                        }
                        const localNow = cloneSnap(exportSnapshot())
                        pushSnapshot = mergeSnapshots(localNow, remoteSnap, base)
                        const v2 = validateSnapshot(pushSnapshot)
                        if (!v2.success) {
                            throw new Error(v2.error)
                        }
                        pushSnapshot = v2.data
                        applySnapshot(pushSnapshot)
                        sha = fresh.sha
                        continue
                    }
                    throw e
                }
            }

            if (!pushedOk) {
                throw new Error('GitHub push failed after retries (SHA conflicts).')
            }

            coord.setLastSyncedSnapshot(cloneSnap(pushSnapshot))
            coord.clearDirtyAfterSuccessfulPush(new Date().toISOString())
            coord.setSyncStatus('success')
            coord.setLastSyncAttemptEnd(Date.now())
            appendJournalEvent({ type: 'sync_succeeded', details: {} })
        } catch (e: unknown) {
            const msg = e instanceof Error ? e.message : String(e)
            appendJournalEvent({ type: 'rollback', details: { error: msg } })
            applySnapshot(backup)
            coord.setSyncStatus('error', msg)
            coord.setLastSyncAttemptEnd(Date.now())
            appendJournalEvent({ type: 'sync_failed', details: { error: msg } })
        } finally {
            coord.setSyncing(false)
        }
    })
}
