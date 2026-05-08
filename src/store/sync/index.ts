import type { Snapshot } from 'src/lib/github-sync/schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SyncStatus =
    | 'idle'
    | 'syncing'
    | 'success'
    | 'conflict'
    | 'offline'
    | 'error'

interface SyncCoordinatorStore {
    isSyncing: boolean
    hasUnsyncedChanges: boolean
    lastSyncedAt?: string
    syncError?: string
    syncStatus: SyncStatus
    lastSyncAttemptEnd?: number
    lastSyncedSnapshot?: Snapshot | null

    setSyncing: (v: boolean) => void
    markDirty: () => void
    clearDirtyAfterSuccessfulPush: (iso?: string) => void
    setSyncStatus: (s: SyncStatus, error?: string) => void
    setLastSyncAttemptEnd: (t?: number) => void
    setLastSyncedSnapshot: (s: Snapshot | null | undefined) => void
}

const useSyncCoordinator = create<SyncCoordinatorStore>()(
    persist(
        (set) => ({
            isSyncing: false,
            hasUnsyncedChanges: false,
            lastSyncedAt: undefined,
            syncError: undefined,
            syncStatus: 'idle',
            lastSyncAttemptEnd: undefined,
            lastSyncedSnapshot: null,

            setSyncing: (v) => set({ isSyncing: v }),
            markDirty: () => set({ hasUnsyncedChanges: true }),
            clearDirtyAfterSuccessfulPush: (iso) =>
                set({
                    hasUnsyncedChanges: false,
                    lastSyncedAt: iso ?? new Date().toISOString(),
                    syncError: undefined,
                    syncStatus: 'success',
                }),
            setSyncStatus: (syncStatus, syncError) => set({ syncStatus, syncError }),
            setLastSyncAttemptEnd: (lastSyncAttemptEnd) => set({ lastSyncAttemptEnd }),
            setLastSyncedSnapshot: (lastSyncedSnapshot) => set({ lastSyncedSnapshot }),
        }),
        {
            name: 'kanban-sync-coordinator',
            version: 1,
            partialize: (s) => ({
                lastSyncedAt: s.lastSyncedAt,
                lastSyncedSnapshot: s.lastSyncedSnapshot,
                lastSyncAttemptEnd: s.lastSyncAttemptEnd,
            }),
        }
    )
)

export default useSyncCoordinator
