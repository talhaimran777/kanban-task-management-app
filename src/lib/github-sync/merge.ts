import type { Board, Column, Subtask, Task } from 'src/types/mock'
import type { EntityMetadata } from 'src/types/mock'
import {
    compareEntityVersions,
    compareTombstones,
    toComparable,
    tombstoneToComparable,
} from './compare'
import { appendJournalEvent } from './journal'
import { repairReferentialIntegrity } from './integrity'
import type { Snapshot } from './schema'
import { SNAPSHOT_VERSION } from './schema'
import type { TombstoneRecord } from './schema'

function jsonClone<T>(t: T): T {
    return JSON.parse(JSON.stringify(t))
}

const BOARD_KEYS: (keyof Board)[] = ['name']
const COLUMN_KEYS: (keyof Column)[] = ['name', 'boardId']
const TASK_KEYS: (keyof Task)[] = ['title', 'description', 'columnId', 'images']
const SUBTASK_KEYS: (keyof Subtask)[] = ['title', 'isCompleted', 'taskId']

function mergeTombstonePair(
    a: TombstoneRecord | undefined,
    b: TombstoneRecord | undefined
): TombstoneRecord | undefined {
    if (!a && !b) return undefined
    if (!a) return b
    if (!b) return a
    return compareTombstones(a, b) >= 0 ? a : b
}

function mergeMetadataThreeWay<L extends EntityMetadata>(
    base: L | undefined,
    local: L,
    remote: L,
    keys: (keyof L)[]
): L {
    const out = { ...local }
    if (!base) {
        const cmp = compareEntityVersions(toComparable(local), toComparable(remote))
        return cmp >= 0 ? local : remote
    }
    for (const k of keys) {
        if (
            k === 'id' ||
            k === 'revision' ||
            k === 'createdAt' ||
            k === 'updatedAt' ||
            k === 'deletedAt' ||
            k === 'lastModifiedByClientId'
        ) {
            continue
        }
        const bv = base[k]
        const lv = local[k]
        const rv = remote[k]
        if (lv === rv) {
            out[k] = lv
        } else if (lv === bv) {
            out[k] = rv as L[keyof L]
        } else if (rv === bv) {
            out[k] = lv as L[keyof L]
        } else {
            const cmp = compareEntityVersions(toComparable(local), toComparable(remote))
            out[k] = (cmp >= 0 ? local[k] : remote[k]) as L[keyof L]
        }
    }
    const cmpMeta = compareEntityVersions(toComparable(local), toComparable(remote))
    if (cmpMeta > 0) {
        out.revision = local.revision
        out.updatedAt = local.updatedAt
        out.lastModifiedByClientId = local.lastModifiedByClientId
        out.createdAt = local.createdAt
    } else if (cmpMeta < 0) {
        out.revision = remote.revision
        out.updatedAt = remote.updatedAt
        out.lastModifiedByClientId = remote.lastModifiedByClientId
        out.createdAt = remote.createdAt
    }
    return out
}

function mergeLiveEntities<L extends EntityMetadata>(
    local: L | undefined,
    remote: L | undefined,
    baseEntity: L | undefined,
    keys: (keyof L)[]
): L | undefined {
    if (!local && !remote) return undefined
    if (!local) return remote
    if (!remote) return local

    const cmp = compareEntityVersions(toComparable(local), toComparable(remote))
    if (cmp !== 0) {
        return cmp > 0 ? local : remote
    }

    if (baseEntity) {
        return mergeMetadataThreeWay(baseEntity, local, remote, keys)
    }

    return local
}

function resolveWithTombstone<L extends EntityMetadata>(
    live: L | undefined,
    tomb: TombstoneRecord | undefined
): { live?: L; tomb?: TombstoneRecord } {
    if (!tomb) {
        return { live, tomb: undefined }
    }
    if (!live) {
        return { live: undefined, tomb }
    }
    const cmp = compareEntityVersions(toComparable(live), tombstoneToComparable(tomb))
    if (cmp > 0) {
        return { live, tomb: undefined }
    }
    return { live: undefined, tomb }
}

function mergeCollection<L extends EntityMetadata>(
    local: Snapshot,
    remote: Snapshot,
    base: Snapshot | undefined,
    mapKey: 'boards' | 'columns' | 'tasks' | 'subtasks',
    tombKey: keyof Snapshot['tombstones'],
    keys: (keyof L)[]
): { map: Record<string, L>; tombs: Record<string, TombstoneRecord> } {
    const ids = new Set<string>()
    Object.keys(local[mapKey]).forEach((id) => ids.add(id))
    Object.keys(remote[mapKey]).forEach((id) => ids.add(id))
    Object.keys(local.tombstones[tombKey]).forEach((id) => ids.add(id))
    Object.keys(remote.tombstones[tombKey]).forEach((id) => ids.add(id))

    const map: Record<string, L> = {}
    const tombs: Record<string, TombstoneRecord> = {}

    for (const id of ids) {
        const Ll = local[mapKey][id] as unknown as L | undefined
        const Rl = remote[mapKey][id] as unknown as L | undefined
        const Tl = local.tombstones[tombKey][id] as TombstoneRecord | undefined
        const Tr = remote.tombstones[tombKey][id] as TombstoneRecord | undefined

        const tombMerged = mergeTombstonePair(Tl, Tr)
        const baseEnt = base?.[mapKey]?.[id] as L | undefined
        const liveMerged = mergeLiveEntities(Ll, Rl, baseEnt, keys)

        let tombFinal = tombMerged
        let liveFinal = liveMerged

        const resolved = resolveWithTombstone(liveFinal, tombFinal)
        liveFinal = resolved.live
        tombFinal = resolved.tomb

        if (liveFinal) {
            map[id] = liveFinal
        }
        if (tombFinal) {
            tombs[id] = tombFinal
        }
    }

    return { map, tombs }
}

/** Best-effort base: unusable bases are treated as undefined */
export function normalizeBase(base: Snapshot | undefined | null): Snapshot | undefined {
    if (!base) return undefined
    try {
        if (base.version !== SNAPSHOT_VERSION) {
            appendJournalEvent({
                type: 'merge_conflict',
                details: { reason: 'base_version_skew', version: base.version },
            })
            return undefined
        }
        return jsonClone(base)
    } catch {
        appendJournalEvent({ type: 'merge_conflict', details: { reason: 'base_corrupt' } })
        return undefined
    }
}

export function mergeSnapshots(
    local: Snapshot,
    remote: Snapshot,
    baseRaw?: Snapshot | undefined | null
): Snapshot {
    const base = normalizeBase(baseRaw ?? undefined)

    if (!base) {
        appendJournalEvent({
            type: 'merge_conflict',
            details: {
                reason: 'merge_fallback_two_way',
                message: 'missing or invalid base snapshot',
            },
        })
    }

    const boards = mergeCollection<Board>(local, remote, base, 'boards', 'boards', BOARD_KEYS)
    const columns = mergeCollection<Column>(local, remote, base, 'columns', 'columns', COLUMN_KEYS)
    const tasks = mergeCollection<Task>(local, remote, base, 'tasks', 'tasks', TASK_KEYS)
    const subtasks = mergeCollection<Subtask>(
        local,
        remote,
        base,
        'subtasks',
        'subtasks',
        SUBTASK_KEYS
    )

    let activeBoardId = local.activeBoardId ?? remote.activeBoardId
    const boardsMap = boards.map
    if (activeBoardId && !boardsMap[activeBoardId]) {
        activeBoardId = undefined
    }

    const merged: Snapshot = {
        version: SNAPSHOT_VERSION,
        metadata: {
            ...remote.metadata,
            ...local.metadata,
        },
        activeBoardId,
        boards: boards.map,
        columns: columns.map,
        tasks: tasks.map,
        subtasks: subtasks.map,
        tombstones: {
            boards: boards.tombs,
            columns: columns.tombs,
            tasks: tasks.tombs,
            subtasks: subtasks.tombs,
        },
    }

    const { snapshot } = repairReferentialIntegrity(merged)
    return snapshot
}
