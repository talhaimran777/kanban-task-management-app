import { Subtasks } from 'src/types/mock'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SubtaskStore {
    subtasks: Subtasks
    setSubtasks: (subtasks: Subtasks) => void
}

const useSubTask = create<SubtaskStore>()(
    persist(
        (set) => ({
            subtasks: {},
            setSubtasks: (subtasks: Subtasks) =>
                set((state) => ({ ...state, subtasks: { ...subtasks } })),
        }),
        {
            name: 'subtasks-storage',
        }
    )
)

export default useSubTask
