import { Task, Tasks } from 'src/types/mock'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TaskStore {
    tasks: Tasks
    setTasks: (tasks: Tasks) => void
    setTask: (task: Task, taskId: string) => void
    taskToView: Task | null
    setTaskToView: (task: Task | null) => void
}

const useTasks = create<TaskStore>()(
    persist(
        (set) => ({
            tasks: {},

            taskToView: null,

            setTasks: (tasks: Tasks) =>
                set((state) => ({ ...state, tasks: { ...tasks } })),

            setTask: (task: Task, taskId: string) =>
                set((state) => {
                    const currentStateTasks = state.tasks
                    delete currentStateTasks[taskId]

                    return {
                        ...state,
                        tasks: { ...currentStateTasks, [task.id]: task },
                    }
                }),

            setTaskToView: (task: Task | null) =>
                set((state) => ({ ...state, taskToView: task })),
        }),
        {
            name: 'tasks-storage',
        }
    )
)

export default useTasks
