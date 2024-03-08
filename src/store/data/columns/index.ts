import { Columns } from 'src/types/mock'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ColumnStore {
    columns: Columns
    setColumns: (columns: Columns) => void
}

const useColumns = create<ColumnStore>()(
    persist(
        (set) => ({
            columns: {},
            setColumns: (columns: Columns) =>
                set((state) => ({ ...state, columns: { ...columns } })),
        }),
        {
            name: 'columns-storage',
        }
    )
)

export default useColumns
