import type { Board, Column, Subtask, Task } from 'src/types/mock'
import type { Snapshot } from './schema'
import { emptyTombstones } from './schema'

export type IntegrityIssue = {
    code: string
    message: string
    entityId?: string
}

export type IntegrityResult = {
    ok: boolean
    issues: IntegrityIssue[]
}

export function validateReferentialIntegrity(snapshot: Snapshot): IntegrityResult {
    const issues: IntegrityIssue[] = []

    for (const id of Object.keys(snapshot.boards)) {
        const b = snapshot.boards[id]
        if (b.id !== id) {
            issues.push({
                code: 'board_key_mismatch',
                message: `Board map key ${id} !== entity id ${b.id}`,
                entityId: id,
            })
        }
    }

    for (const id of Object.keys(snapshot.columns)) {
        const c = snapshot.columns[id]
        if (c.id !== id) {
            issues.push({
                code: 'column_key_mismatch',
                message: `Column map key ${id} !== entity id ${c.id}`,
                entityId: id,
            })
        }
        if (!snapshot.boards[c.boardId] && !snapshot.tombstones.boards[c.boardId]) {
            issues.push({
                code: 'orphan_column',
                message: `Column ${id} references missing board ${c.boardId}`,
                entityId: id,
            })
        }
    }

    for (const id of Object.keys(snapshot.tasks)) {
        const t = snapshot.tasks[id]
        if (t.id !== id) {
            issues.push({
                code: 'task_key_mismatch',
                message: `Task map key ${id} !== entity id ${t.id}`,
                entityId: id,
            })
        }
        if (!snapshot.columns[t.columnId] && !snapshot.tombstones.columns[t.columnId]) {
            issues.push({
                code: 'orphan_task',
                message: `Task ${id} references missing column ${t.columnId}`,
                entityId: id,
            })
        }
    }

    for (const id of Object.keys(snapshot.subtasks)) {
        const st = snapshot.subtasks[id]
        if (st.id !== id) {
            issues.push({
                code: 'subtask_key_mismatch',
                message: `Subtask map key ${id} !== entity id ${st.id}`,
                entityId: id,
            })
        }
        if (!snapshot.tasks[st.taskId] && !snapshot.tombstones.tasks[st.taskId]) {
            issues.push({
                code: 'orphan_subtask',
                message: `Subtask ${id} references missing task ${st.taskId}`,
                entityId: id,
            })
        }
    }

    if (
        snapshot.activeBoardId &&
        !snapshot.boards[snapshot.activeBoardId] &&
        !snapshot.tombstones.boards[snapshot.activeBoardId]
    ) {
        issues.push({
            code: 'invalid_active_board',
            message: `activeBoardId ${snapshot.activeBoardId} does not exist`,
            entityId: snapshot.activeBoardId,
        })
    }

    return { ok: issues.length === 0, issues }
}

export type RepairLogEntry = IntegrityIssue

function jsonClone<T>(v: T): T {
    return JSON.parse(JSON.stringify(v))
}

export function repairReferentialIntegrity(snapshot: Snapshot): {
    snapshot: Snapshot
    logs: RepairLogEntry[]
} {
    const logs: RepairLogEntry[] = []
    let s: Snapshot = jsonClone(snapshot)

    const subtasks: Record<string, Subtask> = { ...s.subtasks }
    for (const id of Object.keys(subtasks)) {
        const st = subtasks[id]
        const taskOk =
            s.tasks[st.taskId] !== undefined || s.tombstones.tasks[st.taskId] !== undefined
        if (!taskOk) {
            delete subtasks[id]
            logs.push({
                code: 'repair_remove_subtask',
                message: `Removed orphan subtask ${id}`,
                entityId: id,
            })
        }
    }
    s = { ...s, subtasks }

    const tasks: Record<string, Task> = { ...s.tasks }
    for (const id of Object.keys(tasks)) {
        const t = tasks[id]
        const colOk =
            s.columns[t.columnId] !== undefined ||
            s.tombstones.columns[t.columnId] !== undefined
        if (!colOk) {
            delete tasks[id]
            logs.push({
                code: 'repair_remove_task',
                message: `Removed orphan task ${id}`,
                entityId: id,
            })
        }
    }
    s = { ...s, tasks }

    const columns: Record<string, Column> = { ...s.columns }
    for (const id of Object.keys(columns)) {
        const c = columns[id]
        const boardOk =
            s.boards[c.boardId] !== undefined ||
            s.tombstones.boards[c.boardId] !== undefined
        if (!boardOk) {
            delete columns[id]
            logs.push({
                code: 'repair_remove_column',
                message: `Removed orphan column ${id}`,
                entityId: id,
            })
        }
    }
    s = { ...s, columns }

    const boards: Record<string, Board> = { ...s.boards }
    for (const id of Object.keys(boards)) {
        const b = boards[id]
        if (b.id !== id) {
            delete boards[id]
            boards[b.id] = { ...b, id: b.id }
            logs.push({
                code: 'repair_normalize_board_key',
                message: `Normalized board key ${id} -> ${b.id}`,
                entityId: b.id,
            })
        }
    }
    s = { ...s, boards }

    // Second pass tasks/subtasks after column/board fixes
    const tasks2: Record<string, Task> = { ...s.tasks }
    for (const id of Object.keys(tasks2)) {
        const t = tasks2[id]
        if (!s.columns[t.columnId] && !s.tombstones.columns[t.columnId]) {
            delete tasks2[id]
            logs.push({
                code: 'repair_remove_task',
                message: `Removed orphan task ${id} (pass 2)`,
                entityId: id,
            })
        }
    }
    s = { ...s, tasks: tasks2 }

    const subtasks2: Record<string, Subtask> = { ...s.subtasks }
    for (const id of Object.keys(subtasks2)) {
        const st = subtasks2[id]
        if (!s.tasks[st.taskId] && !s.tombstones.tasks[st.taskId]) {
            delete subtasks2[id]
            logs.push({
                code: 'repair_remove_subtask',
                message: `Removed orphan subtask ${id} (pass 2)`,
                entityId: id,
            })
        }
    }
    s = { ...s, subtasks: subtasks2 }

    if (
        s.activeBoardId &&
        !s.boards[s.activeBoardId] &&
        !s.tombstones.boards[s.activeBoardId]
    ) {
        logs.push({
            code: 'repair_clear_active_board',
            message: `Cleared invalid activeBoardId ${s.activeBoardId}`,
            entityId: s.activeBoardId,
        })
        s = { ...s, activeBoardId: undefined }
    }

    return { snapshot: s, logs }
}

/** Ensure tombstone maps exist */
export function ensureTombstoneShape(snapshot: Snapshot): Snapshot {
    const t = snapshot.tombstones ?? emptyTombstones()
    return {
        ...snapshot,
        tombstones: {
            boards: t.boards ?? {},
            columns: t.columns ?? {},
            tasks: t.tasks ?? {},
            subtasks: t.subtasks ?? {},
        },
    }
}
