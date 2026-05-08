import type { EntityMetadata } from 'src/types/mock'
import type { TombstoneRecord } from './schema'

/** Comparable view for deletes vs live entities */
export type VersionComparable = {
    revision: number
    updatedAt: string
    lastModifiedByClientId: string
}

export function toComparable(meta: EntityMetadata): VersionComparable {
    return {
        revision: meta.revision,
        updatedAt: meta.updatedAt,
        lastModifiedByClientId: meta.lastModifiedByClientId,
    }
}

export function tombstoneToComparable(t: TombstoneRecord): VersionComparable {
    return {
        revision: t.revision,
        updatedAt: t.deletedAt,
        lastModifiedByClientId: t.deletedByClientId,
    }
}

/**
 * @returns negative if a is older than b, positive if a is newer than b, 0 if equal.
 * “Newer wins” ordering: revision DESC, updatedAt DESC, lastModifiedByClientId DESC.
 */
export function compareEntityVersions(a: VersionComparable, b: VersionComparable): number {
    if (a.revision !== b.revision) {
        return a.revision - b.revision
    }
    if (a.updatedAt !== b.updatedAt) {
        return a.updatedAt > b.updatedAt ? 1 : a.updatedAt < b.updatedAt ? -1 : 0
    }
    if (a.lastModifiedByClientId !== b.lastModifiedByClientId) {
        return a.lastModifiedByClientId > b.lastModifiedByClientId
            ? 1
            : a.lastModifiedByClientId < b.lastModifiedByClientId
              ? -1
              : 0
    }
    return 0
}

export function compareTombstones(a: TombstoneRecord, b: TombstoneRecord): number {
    return compareEntityVersions(tombstoneToComparable(a), tombstoneToComparable(b))
}
