import { describe, expect, it } from 'vitest'
import { compareEntityVersions } from './compare'

describe('compareEntityVersions', () => {
    const base = {
        revision: 2,
        updatedAt: '2026-01-02T00:00:00.000Z',
        lastModifiedByClientId: 'bbb',
    }

    it('orders revision DESC', () => {
        expect(
            compareEntityVersions(
                { ...base, revision: 3 },
                { ...base, revision: 2 }
            )
        ).toBeGreaterThan(0)
    })

    it('tie-breaks with updatedAt DESC', () => {
        expect(
            compareEntityVersions(
                { revision: 1, updatedAt: '2026-01-03T00:00:00.000Z', lastModifiedByClientId: 'a' },
                { revision: 1, updatedAt: '2026-01-02T00:00:00.000Z', lastModifiedByClientId: 'b' }
            )
        ).toBeGreaterThan(0)
    })

    it('tie-breaks with clientId lex DESC', () => {
        expect(
            compareEntityVersions(
                { revision: 1, updatedAt: '2026-01-02T00:00:00.000Z', lastModifiedByClientId: 'zzz' },
                { revision: 1, updatedAt: '2026-01-02T00:00:00.000Z', lastModifiedByClientId: 'aaa' }
            )
        ).toBeGreaterThan(0)
    })
})
