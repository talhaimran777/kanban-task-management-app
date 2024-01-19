import { Subtask } from 'types/mock/v2'
import { create } from 'zustand'

interface SubtaskStore {
    subtasks: Subtask[]
    setSubtasks: (subtasks: Subtask[]) => void
}

const useSubTask = create<SubtaskStore>((set) => ({
    subtasks: [],
    setSubtasks: (subtasks: Subtask[]) =>
        set((state) => ({ ...state, subtasks: [...subtasks] })),
}))

export default useSubTask