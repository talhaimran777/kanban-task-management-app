import { Board } from 'src/types/mock'
import { create } from 'zustand'

interface BoardStore {
    boards: Board[]
    setBoards: (boards: Board[]) => void
}

const useBoards = create<BoardStore>((set) => ({
    boards: [],
    setBoards: (boards: Board[]) =>
        set((state) => ({ ...state, boards: [...boards] })),
}))

export default useBoards
