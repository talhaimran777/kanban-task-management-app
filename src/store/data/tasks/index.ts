import { Task } from 'src/types/mock'
import { create } from 'zustand'

interface TaskStore {
    tasks: Task[]
    setTasks: (tasks: Task[]) => void
}

const useTask = create<TaskStore>((set) => ({
    tasks: [],
    setTasks: (tasks: Task[]) =>
        set((state) => ({ ...state, tasks: [...tasks] })),
}))

export default useTask
