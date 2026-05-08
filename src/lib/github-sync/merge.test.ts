import { describe, expect, it } from 'vitest'
import { mergeSnapshots, normalizeBase } from './merge'
import type { Snapshot } from './schema'
import { SNAPSHOT_VERSION, emptySnapshot } from './schema'

function board(id: string, rev: number, client: string): Snapshot['boards'][string] {
    const t = '2026-01-01T00:00:00.000Z'
    return {
        id,
        name: 'B',
        createdAt: t,
        updatedAt: t,
        revision: rev,
        lastModifiedByClientId: client,
    }
}

describe('mergeSnapshots', () => {
    it('falls back when base invalid version', () => {
        const badBase = { ...emptySnapshot(), version: 0 } as Snapshot
        expect(normalizeBase(badBase)).toBeUndefined()
    })

    it('picks higher revision entity', () => {
        const local: Snapshot = {
            ...emptySnapshot(),
            version: SNAPSHOT_VERSION,
            boards: { a: board('a', 2, 'c1') },
        }
        const remote: Snapshot = {
            ...emptySnapshot(),
            version: SNAPSHOT_VERSION,
            boards: { a: board('a', 5, 'c2') },
        }
        const merged = mergeSnapshots(local, remote, undefined)
        expect(merged.boards.a.revision).toBe(5)
    })
})
