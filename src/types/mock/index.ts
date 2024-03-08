export interface Boards {
    [id: string]: Board
}

export interface Columns {
    [id: string]: Column
}

export interface Tasks {
    [id: string]: Task
}

export interface Subtasks {
    [id: string]: Subtask
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
    columnId: string
}

export interface Subtask {
    id: string
    title: string
    isCompleted: boolean
    taskId: string
}
