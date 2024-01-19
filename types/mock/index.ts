/**
 * @deprecated
 */
export interface Data {
    selectedBoard?: string
}

/**
 * @deprecated
 */
export interface Column {
    id: number
    name: string
    tasks?: Task[]
}

/**
 * @deprecated
 */
export interface Task {
    id?: string
    title: string
    description: string
    status: string
    subtasks?: SubTask[]
}

/**
 * @deprecated
 */
export interface SubTask {
    id: string
    title: string
    isCompleted: boolean
}
