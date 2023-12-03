export interface Data {
  boards: Board[]
}

export interface Board {
  name: string
  columns: Column[]
  isActive?: boolean
}

interface Column {
  name: string
  tasks: Task[]
}

interface Task {
  title: string
  description: string
  status: string
  subtasks: SubTask[]
}

interface SubTask {
  title: string
  isCompleted: boolean
}
