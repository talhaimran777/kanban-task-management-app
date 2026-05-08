import type { Snapshot } from './schema'
import {
    ensureTombstoneShape,
    repairReferentialIntegrity,
    type RepairLogEntry,
} from './integrity'

function jsonClone<T>(v: T): T {
    return JSON.parse(JSON.stringify(v))
}

export type RepairSnapshotResult = {
    snapshot: Snapshot
    logs: RepairLogEntry[]
}

/**
 * Deterministic, idempotent repair pass before zod validation.
 */
export function repairSnapshot(snapshot: Snapshot): RepairSnapshotResult {
    let s = ensureTombstoneShape(jsonClone(snapshot))
    const allLogs: RepairLogEntry[] = []

    const first = repairReferentialIntegrity(s)
    s = first.snapshot
    allLogs.push(...first.logs)

    const second = repairReferentialIntegrity(s)
    s = second.snapshot
    allLogs.push(...second.logs)

    return { snapshot: s, logs: allLogs }
}
