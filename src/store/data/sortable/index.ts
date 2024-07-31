import { Column, Task } from 'src/types/mock'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SortableStore {
    activeTask: Task | null
    activeColumn: Column | null

    tasks: Task[]
    columns: Column[]

    setActiveTask: (taskId: Task | null) => void
    setActiveColumn: (columnId: Column | null) => void

    setTasks: (tasks: Task[]) => void
    setColumns: (columns: Column[]) => void
}

const useSortableData = create<SortableStore>()(
    persist(
        (set) => ({
            activeTask: null,
            activeColumn: null,

            tasks: [],
            columns: [],

            setActiveTask: (task) => set({ activeTask: task }),
            setActiveColumn: (column) => set({ activeColumn: column }),

            setTasks: (tasks) => set({ tasks: tasks }),
            setColumns: (columns) => set({ columns: columns }),
        }),
        {
            name: 'sortable-storage',
        }
    )
)

export default useSortableData
