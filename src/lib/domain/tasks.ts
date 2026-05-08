import { getClientId } from 'src/lib/device/client-id'
import {
    bumpMeta,
    createMeta,
    normalizeSubtask,
    normalizeTask,
    tombstoneFromEntity,
} from 'src/lib/domain/meta'
import taskFormSchema from 'src/schema/task-form-schema'
import { markDirtyAndScheduleSync } from 'src/lib/github-sync/scheduler'
import useSubtasks from 'src/store/data/subtasks'
import useTasks from 'src/store/data/tasks'
import useTombstones from 'src/store/data/tombstones'
import type { Subtask, Task } from 'src/types/mock'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

export function putTask(task: Task): void {
    const { tasks, setTasks } = useTasks.getState()
    const existing = tasks[task.id]
    const nextTask = existing
        ? bumpMeta({ ...existing, ...task }, getClientId())
        : normalizeTask(task, getClientId())
    setTasks({ ...tasks, [task.id]: nextTask })
    markDirtyAndScheduleSync()
}

export function moveTask(task: Task, columnId: string): void {
    const { tasks, setTasks } = useTasks.getState()
    const existing = tasks[task.id]
    if (!existing) return
    const nextTask = bumpMeta({ ...existing, columnId }, getClientId())
    setTasks({ ...tasks, [task.id]: nextTask })
    markDirtyAndScheduleSync()
}

export function moveTasksOffRemovedColumns(
    removedColumnIds: string[],
    targetColumnId: string
): void {
    if (!removedColumnIds.length || !targetColumnId) return
    const removed = new Set(removedColumnIds)
    const { tasks, setTasks } = useTasks.getState()
    let next = { ...tasks }
    let changed = false
    for (const id of Object.keys(next)) {
        const task = next[id]
        if (removed.has(task.columnId)) {
            next[id] = bumpMeta({ ...task, columnId: targetColumnId }, getClientId())
            changed = true
        }
    }
    if (changed) {
        setTasks(next)
        markDirtyAndScheduleSync()
    }
}

export function createTaskFromForm(
    values: z.infer<typeof taskFormSchema>,
    images: string[]
): { task: Task; subtasks: Subtask[] } {
    const cid = getClientId()
    const meta = createMeta(cid)
    const task: Task = {
        id: uuidv4(),
        title: values.title,
        description: values.description ?? '',
        columnId: values.status,
        ...meta,
    }
    if (images.length > 0) {
        task.images = images
    }

    const subtasks: Subtask[] =
        values.subtasks?.map((s) => ({
            id: uuidv4(),
            title: s.name,
            isCompleted: false,
            taskId: task.id,
            ...createMeta(cid),
        })) ?? []

    return { task, subtasks }
}

export function addTask(task: Task): void {
    const { tasks, setTasks } = useTasks.getState()
    setTasks({ ...tasks, [task.id]: task })
    markDirtyAndScheduleSync()
}

export function addTaskWithSubtasks(task: Task, subtasks: Subtask[]): void {
    const { tasks, setTasks } = useTasks.getState()
    const { subtasks: subs, setSubtasks } = useSubtasks.getState()
    const nextSubs = { ...subs }
    for (const s of subtasks) {
        nextSubs[s.id] = normalizeSubtask(s)
    }
    setTasks({ ...tasks, [task.id]: normalizeTask(task, getClientId()) })
    setSubtasks(nextSubs)
    markDirtyAndScheduleSync()
}

export function replaceSubtasksForTask(taskId: string, nextSubtasks: Subtask[]): void {
    const { subtasks, setSubtasks } = useSubtasks.getState()
    const { tombstones, setTombstones } = useTombstones.getState()
    const tomb = {
        boards: { ...tombstones.boards },
        columns: { ...tombstones.columns },
        tasks: { ...tombstones.tasks },
        subtasks: { ...tombstones.subtasks },
    }

    const filtered: Record<string, Subtask> = {}
    for (const id of Object.keys(subtasks)) {
        const st = subtasks[id]
        if (st.taskId !== taskId) {
            filtered[id] = st
        } else {
            tomb.subtasks[id] = tombstoneFromEntity(st)
        }
    }

    for (const st of nextSubtasks) {
        filtered[st.id] = normalizeSubtask(st)
    }

    setSubtasks(filtered)
    setTombstones(tomb)
    markDirtyAndScheduleSync()
}

export function deleteTaskCascade(taskId: string): void {
    const { tasks, setTasks } = useTasks.getState()
    const { subtasks, setSubtasks } = useSubtasks.getState()
    const { tombstones, setTombstones } = useTombstones.getState()
    const tomb = {
        boards: { ...tombstones.boards },
        columns: { ...tombstones.columns },
        tasks: { ...tombstones.tasks },
        subtasks: { ...tombstones.subtasks },
    }

    const task = tasks[taskId]
    if (!task) return

    const nextSubs = { ...subtasks }
    for (const sid of Object.keys(nextSubs)) {
        const st = nextSubs[sid]
        if (st.taskId === taskId) {
            tomb.subtasks[sid] = tombstoneFromEntity(st)
            delete nextSubs[sid]
        }
    }

    tomb.tasks[taskId] = tombstoneFromEntity(task)
    const nextTasks = { ...tasks }
    delete nextTasks[taskId]

    setSubtasks(nextSubs)
    setTasks(nextTasks)
    setTombstones(tomb)
    markDirtyAndScheduleSync()
}
