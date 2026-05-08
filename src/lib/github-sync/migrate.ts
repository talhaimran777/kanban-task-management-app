import type { Snapshot } from './schema'
import { SNAPSHOT_VERSION, emptySnapshot } from './schema'

/** Normalize unknown parsed JSON into a Snapshot-shaped object before repair */
export function coerceSnapshot(raw: unknown): Snapshot {
    if (!raw || typeof raw !== 'object') {
        return { ...emptySnapshot(), version: 0 }
    }
    const o = raw as Record<string, unknown>
    return {
        version: typeof o.version === 'number' ? o.version : 0,
        metadata:
            o.metadata && typeof o.metadata === 'object'
                ? (o.metadata as Snapshot['metadata'])
                : {},
        activeBoardId: typeof o.activeBoardId === 'string' ? o.activeBoardId : undefined,
        boards:
            o.boards && typeof o.boards === 'object'
                ? (o.boards as Snapshot['boards'])
                : {},
        columns:
            o.columns && typeof o.columns === 'object'
                ? (o.columns as Snapshot['columns'])
                : {},
        tasks:
            o.tasks && typeof o.tasks === 'object' ? (o.tasks as Snapshot['tasks']) : {},
        subtasks:
            o.subtasks && typeof o.subtasks === 'object'
                ? (o.subtasks as Snapshot['subtasks'])
                : {},
        tombstones:
            o.tombstones && typeof o.tombstones === 'object'
                ? {
                      boards:
                          ((o.tombstones as TombstonesPartial).boards as Snapshot['tombstones']['boards']) ??
                          {},
                      columns:
                          ((o.tombstones as TombstonesPartial).columns as Snapshot['tombstones']['columns']) ??
                          {},
                      tasks:
                          ((o.tombstones as TombstonesPartial).tasks as Snapshot['tombstones']['tasks']) ??
                          {},
                      subtasks:
                          ((o.tombstones as TombstonesPartial).subtasks as Snapshot['tombstones']['subtasks']) ??
                          {},
                  }
                : {
                      boards: {},
                      columns: {},
                      tasks: {},
                      subtasks: {},
                  },
    }
}

type TombstonesPartial = {
    boards?: unknown
    columns?: unknown
    tasks?: unknown
    subtasks?: unknown
}

export function migrateSnapshot(snapshot: Snapshot): Snapshot {
    let s = { ...snapshot }
    let v = s.version || 0

    while (v < SNAPSHOT_VERSION) {
        if (v === 0) {
            s = migrateV0ToV1(s)
            v = 1
        } else {
            break
        }
        s = { ...s, version: v }
    }

    if (s.version !== SNAPSHOT_VERSION) {
        s = { ...s, version: SNAPSHOT_VERSION }
    }
    return s
}

/** Legacy data without snapshot wrapper — treat maps only */
function migrateV0ToV1(s: Snapshot): Snapshot {
    return {
        ...s,
        version: 1,
        metadata: s.metadata ?? {},
        tombstones: s.tombstones ?? {
            boards: {},
            columns: {},
            tasks: {},
            subtasks: {},
        },
    }
}
