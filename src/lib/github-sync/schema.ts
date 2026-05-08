import { z } from 'zod'

export const SNAPSHOT_VERSION = 1 as const

export type TombstoneRecord = {
    deletedAt: string
    revision: number
    deletedByClientId: string
}

export type TombstoneMaps = {
    boards: Record<string, TombstoneRecord>
    columns: Record<string, TombstoneRecord>
    tasks: Record<string, TombstoneRecord>
    subtasks: Record<string, TombstoneRecord>
}

export type SnapshotMetadata = {
    lastSyncedAt?: string
    exporterClientId?: string
}

export type Snapshot = {
    version: number
    metadata: SnapshotMetadata
    activeBoardId?: string
    boards: Record<string, import('src/types/mock').Board>
    columns: Record<string, import('src/types/mock').Column>
    tasks: Record<string, import('src/types/mock').Task>
    subtasks: Record<string, import('src/types/mock').Subtask>
    tombstones: TombstoneMaps
}

const tombstoneRecordSchema = z.object({
    deletedAt: z.string(),
    revision: z.number().int().nonnegative(),
    deletedByClientId: z.string().min(1),
})

const entityMetaFields = {
    id: z.string().min(1),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().optional(),
    revision: z.number().int().nonnegative(),
    lastModifiedByClientId: z.string().min(1),
}

export const boardSchema = z.object({
    ...entityMetaFields,
    name: z.string(),
})

export const columnSchema = z.object({
    ...entityMetaFields,
    name: z.string(),
    boardId: z.string(),
})

export const taskSchema = z.object({
    ...entityMetaFields,
    title: z.string(),
    description: z.string(),
    columnId: z.string(),
    images: z.array(z.string()).optional(),
})

export const subtaskSchema = z.object({
    ...entityMetaFields,
    title: z.string(),
    isCompleted: z.boolean(),
    taskId: z.string(),
})

export const snapshotSchema = z.object({
    version: z.number().int().positive(),
    metadata: z.object({
        lastSyncedAt: z.string().optional(),
        exporterClientId: z.string().optional(),
    }),
    activeBoardId: z.string().optional(),
    boards: z.record(boardSchema),
    columns: z.record(columnSchema),
    tasks: z.record(taskSchema),
    subtasks: z.record(subtaskSchema),
    tombstones: z.object({
        boards: z.record(tombstoneRecordSchema),
        columns: z.record(tombstoneRecordSchema),
        tasks: z.record(tombstoneRecordSchema),
        subtasks: z.record(tombstoneRecordSchema),
    }),
})

export type ParsedSnapshot = z.infer<typeof snapshotSchema>

export function emptyTombstones(): TombstoneMaps {
    return {
        boards: {},
        columns: {},
        tasks: {},
        subtasks: {},
    }
}

export function emptySnapshot(): Snapshot {
    return {
        version: SNAPSHOT_VERSION,
        metadata: {},
        boards: {},
        columns: {},
        tasks: {},
        subtasks: {},
        tombstones: emptyTombstones(),
    }
}
