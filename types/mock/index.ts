export interface Data {
  boards: Board[]
  selectedBoard?: number
}

export interface Board {
  id: number
  name: string
  columns?: Column[]
  isActive?: boolean
}

export interface Column {
  id: number
  name: string
  tasks?: Task[]
}

export type Status = 'Todo' | 'Doing' | 'Done'

export interface Task {
  id: number
  title: string
  description: string
  status: Status
  subtasks?: SubTask[]
}

export interface SubTask {
  id: number
  title: string
  isCompleted: boolean
}
