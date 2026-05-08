import { bumpMeta, normalizeSubtask } from 'src/lib/domain/meta'
import { getClientId } from 'src/lib/device/client-id'
import useSubtasks from 'src/store/data/subtasks'
import { markDirtyAndScheduleSync } from 'src/lib/github-sync/scheduler'
import type { Subtask } from 'src/types/mock'

export function upsertSubtask(subtask: Subtask): void {
    const { subtasks, setSubtasks } = useSubtasks.getState()
    const existing = subtasks[subtask.id]
    const next = existing
        ? bumpMeta({ ...existing, ...subtask }, getClientId())
        : normalizeSubtask(subtask)
    setSubtasks({ ...subtasks, [subtask.id]: next })
    markDirtyAndScheduleSync()
}
