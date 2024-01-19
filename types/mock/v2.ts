export interface Data {
    boards: Board[]
    columns: Column[]
    tasks: Task[]
    subtasks: Subtask[]
    activeBoard: string
}

export interface Board {
    id: string
    name: string
}

export interface Column {
    id: string
    name: string
    boardId: string
}

export interface Task {
    id: string
    title: string
    description: string
    status: string
    columnId: string
}

export interface Subtask {
    id: string
    title: string
    isCompleted: boolean
    taskId: string
}
