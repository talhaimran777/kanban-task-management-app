import { Task } from 'types/mock/v2'
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
