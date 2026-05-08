/** Sync / versioning metadata on every persisted entity */
export interface EntityMetadata {
    createdAt: string
    updatedAt: string
    deletedAt?: string
    revision: number
    lastModifiedByClientId: string
}

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

export interface Board extends EntityMetadata {
    id: string
    name: string
}

export interface Column extends EntityMetadata {
    id: string
    name: string
    boardId: string
}

export interface Task extends EntityMetadata {
    id: string
    title: string
    description: string
    columnId: string
    images?: string[]
}

export interface Subtask extends EntityMetadata {
    id: string
    title: string
    isCompleted: boolean
    taskId: string
}
