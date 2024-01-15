import { create } from 'zustand'

interface ActiveBoardStore {
    activeBoardId?: string
    setActiveBoardId: (boardId: string) => void
}

const useActiveBoard = create<ActiveBoardStore>((set) => ({
    activeBoardId: '',
    setActiveBoardId: (boardId: string) =>
        set((state) => ({ ...state, activeBoardId: boardId })),
}))

export default useActiveBoard
