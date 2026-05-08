import { describe, expect, it } from 'vitest'
import { validateReferentialIntegrity } from './integrity'
import { repairSnapshot } from './repair'
import type { Snapshot } from './schema'
import { SNAPSHOT_VERSION, emptySnapshot } from './schema'

describe('repairSnapshot', () => {
    it('removes orphan tasks idempotently', () => {
        const snap: Snapshot = {
            ...emptySnapshot(),
            version: SNAPSHOT_VERSION,
            boards: {
                b: {
                    id: 'b',
                    name: 'Board',
                    createdAt: '2026-01-01T00:00:00.000Z',
                    updatedAt: '2026-01-01T00:00:00.000Z',
                    revision: 1,
                    lastModifiedByClientId: 'x',
                },
            },
            columns: {
                col: {
                    id: 'col',
                    name: 'Col',
                    boardId: 'b',
                    createdAt: '2026-01-01T00:00:00.000Z',
                    updatedAt: '2026-01-01T00:00:00.000Z',
                    revision: 1,
                    lastModifiedByClientId: 'x',
                },
            },
            tasks: {
                t1: {
                    id: 't1',
                    title: 'x',
                    description: '',
                    columnId: 'missing-col',
                    createdAt: '2026-01-01T00:00:00.000Z',
                    updatedAt: '2026-01-01T00:00:00.000Z',
                    revision: 1,
                    lastModifiedByClientId: 'x',
                },
            },
        }

        const once = repairSnapshot(snap)
        const twice = repairSnapshot(once.snapshot)
        expect(once.snapshot.tasks.t1).toBeUndefined()
        expect(validateReferentialIntegrity(once.snapshot).ok).toBe(true)
        expect(once.logs.length).toBeGreaterThan(0)
        expect(twice.logs.length).toBe(0)
    })
})
