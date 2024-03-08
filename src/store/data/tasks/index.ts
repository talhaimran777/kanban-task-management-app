import { Tasks } from 'src/types/mock'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TaskStore {
    tasks: Tasks
    setTasks: (tasks: Tasks) => void
}

const useTasks = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: {},
            setTasks: (tasks: Tasks) =>
                set((state) => ({ ...state, tasks: { ...tasks } })),
        }),
        {
            name: 'tasks-storage',
        }
    )
)

export default useTasks
