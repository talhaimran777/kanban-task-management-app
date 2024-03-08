import { Boards } from 'src/types/mock'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BoardStore {
    boards: Boards
    setBoards: (boards: Boards) => void
}

const useBoards = create<BoardStore>()(
    persist(
        (set) => ({
            boards: {},
            setBoards: (boards: Boards) =>
                set((state) => ({ ...state, boards: { ...boards } })),
        }),
        {
            name: 'boards-storage',
        }
    )
)

export default useBoards
