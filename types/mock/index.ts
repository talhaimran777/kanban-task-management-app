export interface Data {
    boards: Board[]
    selectedBoard?: string
}

export interface Board {
    id: string
    name: string
    columns?: Column[]
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
