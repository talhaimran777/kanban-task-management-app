import { getClientId } from 'src/lib/device/client-id'
import type { Board, Column, EntityMetadata, Subtask, Task } from 'src/types/mock'
import type { TombstoneRecord } from 'src/lib/github-sync/schema'

const isoNow = () => new Date().toISOString()

export function bumpMeta<E extends { revision: number; updatedAt: string; lastModifiedByClientId: string }>(
    entity: E,
    clientId?: string
): E {
    const cid = clientId ?? getClientId()
    return {
        ...entity,
        revision: entity.revision + 1,
        updatedAt: isoNow(),
        lastModifiedByClientId: cid,
    }
}

export function createMeta(clientId?: string): {
    createdAt: string
    updatedAt: string
    revision: number
    lastModifiedByClientId: string
} {
    const cid = clientId ?? getClientId()
    const t = isoNow()
    return {
        createdAt: t,
        updatedAt: t,
        revision: 1,
        lastModifiedByClientId: cid,
    }
}

export function normalizeBoard(raw: Partial<Board>, fallbackClient?: string): Board {
    const m = createMeta(fallbackClient)
    const cid = fallbackClient ?? getClientId()
    return {
        id: raw.id as string,
        name: raw.name ?? '',
        createdAt: raw.createdAt ?? m.createdAt,
        updatedAt: raw.updatedAt ?? m.updatedAt,
        revision: raw.revision ?? 1,
        lastModifiedByClientId: raw.lastModifiedByClientId ?? cid,
        deletedAt: raw.deletedAt,
    }
}

export function normalizeColumn(raw: Partial<Column>, fallbackClient?: string): Column {
    const m = createMeta(fallbackClient)
    const cid = fallbackClient ?? getClientId()
    return {
        id: raw.id as string,
        name: raw.name ?? '',
        boardId: raw.boardId as string,
        createdAt: raw.createdAt ?? m.createdAt,
        updatedAt: raw.updatedAt ?? m.updatedAt,
        revision: raw.revision ?? 1,
        lastModifiedByClientId: raw.lastModifiedByClientId ?? cid,
        deletedAt: raw.deletedAt,
    }
}

export function normalizeTask(raw: Partial<Task>, fallbackClient?: string): Task {
    const m = createMeta(fallbackClient)
    const cid = fallbackClient ?? getClientId()
    return {
        id: raw.id as string,
        title: raw.title ?? '',
        description: raw.description ?? '',
        columnId: raw.columnId as string,
        images: raw.images,
        createdAt: raw.createdAt ?? m.createdAt,
        updatedAt: raw.updatedAt ?? m.updatedAt,
        revision: raw.revision ?? 1,
        lastModifiedByClientId: raw.lastModifiedByClientId ?? cid,
        deletedAt: raw.deletedAt,
    }
}

export function normalizeSubtask(raw: Partial<Subtask>, fallbackClient?: string): Subtask {
    const m = createMeta(fallbackClient)
    const cid = fallbackClient ?? getClientId()
    return {
        id: raw.id as string,
        title: raw.title ?? '',
        isCompleted: raw.isCompleted ?? false,
        taskId: raw.taskId as string,
        createdAt: raw.createdAt ?? m.createdAt,
        updatedAt: raw.updatedAt ?? m.updatedAt,
        revision: raw.revision ?? 1,
        lastModifiedByClientId: raw.lastModifiedByClientId ?? cid,
        deletedAt: raw.deletedAt,
    }
}

export function tombstoneFromEntity(ent: EntityMetadata): TombstoneRecord {
    const cid = getClientId()
    return {
        deletedAt: isoNow(),
        revision: ent.revision + 1,
        deletedByClientId: cid,
    }
}
