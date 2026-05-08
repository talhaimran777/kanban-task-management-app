import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ActiveBoardStore {
    activeBoardId?: string
    setActiveBoardId: (boardId: string) => void
}

const useActiveBoard = create<ActiveBoardStore>()(
    persist(
        (set) => ({
            activeBoardId: '',
            setActiveBoardId: (boardId: string) =>
                set((state) => ({ ...state, activeBoardId: boardId })),
        }),
        { name: 'active-board-storage', version: 1 }
    )
)

export default useActiveBoard
