import { Subtask, Subtasks } from 'src/types/mock'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SubtaskStore {
    subtasks: Subtasks
    setSubtasks: (subtasks: Subtasks) => void
    setSubtask: (subtask: Subtask, id: string) => void
}

const useSubTask = create<SubtaskStore>()(
    persist(
        (set) => ({
            subtasks: {},

            setSubtasks: (subtasks: Subtasks) =>
                set((state) => ({ ...state, subtasks: { ...subtasks } })),

            setSubtask: (subtask: Subtask, id: string) =>
                set((state) => ({ ...state, subtasks: { ...state.subtasks, [id]: subtask } })),
        }),
        {
            name: 'subtasks-storage',
        }
    )
)

export default useSubTask
