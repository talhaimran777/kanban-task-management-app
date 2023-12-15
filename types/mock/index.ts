export interface Data {
  boards: Board[]
  currentBoard: string
}

export interface Board {
  name: string
  columns: Column[]
  isActive?: boolean
}

export interface Column {
  name: string
  tasks: Task[]
}

export type Status = 'Todo' | 'Doing' | 'Done'

export interface Task {
  title: string
  description: string
  status: Status
  subtasks?: SubTask[]
}

export interface SubTask {
  title: string
  isCompleted: boolean
}
