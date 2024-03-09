import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BoundStore {
    hydrated: boolean
    setHydrated: (hydrated: boolean) => void
}

const useBound = create<BoundStore>()(
    persist(
        (set) => ({
            hydrated: false,
            setHydrated: (hydrated: boolean) =>
                set((state) => ({ ...state, hydrated })),
        }),
        {
            name: 'hydrated-storage',
            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true)
            },
        }
    )
)

export default useBound
