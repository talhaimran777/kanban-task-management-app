import { Column } from 'types/mock/v2'
import { create } from 'zustand'

interface ColumnStore {
    columns: Column[]
    setColumns: (columns: Column[]) => void
}

const useColumns = create<ColumnStore>((set) => ({
    columns: [],
    setColumns: (columns: Column[]) =>
        set((state) => ({ ...state, columns: [...columns] })),
}))

export default useColumns
