'use client'

import useGitHubRepoSettings from 'src/store/github-settings'
import useSyncCoordinator from 'src/store/sync'
import { MIN_SYNC_INTERVAL_MS, SYNC_DEBOUNCE_MS, syncWithGitHub } from './sync'

let debounceTimer: ReturnType<typeof setTimeout> | null = null
let trailingTimer: ReturnType<typeof setTimeout> | null = null

export function cancelAutoSyncTimers(): void {
    if (debounceTimer) {
        clearTimeout(debounceTimer)
        debounceTimer = null
    }
    if (trailingTimer) {
        clearTimeout(trailingTimer)
        trailingTimer = null
    }
}

async function attemptAutoSync(): Promise<void> {
    trailingTimer = null
    const coord = useSyncCoordinator.getState()
    const repo = useGitHubRepoSettings.getState()

    if (!repo.owner || !repo.repo || !repo.path) {
        return
    }

    if (!coord.hasUnsyncedChanges || coord.isSyncing) {
        return
    }

    const now = Date.now()
    const last = coord.lastSyncAttemptEnd ?? 0
    const elapsed = now - last
    if (last > 0 && elapsed < MIN_SYNC_INTERVAL_MS) {
        trailingTimer = setTimeout(() => void attemptAutoSync(), MIN_SYNC_INTERVAL_MS - elapsed)
        return
    }

    await syncWithGitHub({ manual: false })
}

function queueAutoSync(): void {
    if (debounceTimer) {
        clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
        debounceTimer = null
        void attemptAutoSync()
    }, SYNC_DEBOUNCE_MS)
}

/** Debounced auto-sync after mutations + minimum spacing between attempts. */
export function markDirtyAndScheduleSync(): void {
    useSyncCoordinator.getState().markDirty()
    queueAutoSync()
}
