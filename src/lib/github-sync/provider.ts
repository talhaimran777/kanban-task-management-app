import type { Snapshot } from './schema'

export type PullResult = {
    snapshot: Snapshot | null
    sha?: string
}

export interface SyncProvider {
    pull(): Promise<PullResult>
    push(snapshot: Snapshot, opts: { sha?: string }): Promise<void>
}
