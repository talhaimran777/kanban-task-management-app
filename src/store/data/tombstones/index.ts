import type { TombstoneMaps } from 'src/lib/github-sync/schema'
import { emptyTombstones } from 'src/lib/github-sync/schema'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TombstoneStore {
    tombstones: TombstoneMaps
    setTombstones: (t: TombstoneMaps) => void
}

const useTombstones = create<TombstoneStore>()(
    persist(
        (set) => ({
            tombstones: emptyTombstones(),
            setTombstones: (tombstones: TombstoneMaps) =>
                set(() => ({
                    tombstones: {
                        boards: { ...tombstones.boards },
                        columns: { ...tombstones.columns },
                        tasks: { ...tombstones.tasks },
                        subtasks: { ...tombstones.subtasks },
                    },
                })),
        }),
        { name: 'tombstones-storage', version: 1 }
    )
)

export default useTombstones
