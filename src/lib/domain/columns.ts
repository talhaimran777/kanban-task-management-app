import { getClientId } from 'src/lib/device/client-id'
import createColumnEntity from 'src/lib/domain/column-factory'
import { bumpMeta, normalizeColumn, tombstoneFromEntity } from 'src/lib/domain/meta'
import useColumns from 'src/store/data/columns'
import { markDirtyAndScheduleSync } from 'src/lib/github-sync/scheduler'
import useTombstones from 'src/store/data/tombstones'
import type { Column } from 'src/types/mock'

export function putColumn(column: Column): void {
    const { columns, setColumns } = useColumns.getState()
    const existing = columns[column.id]
    const nextCol = existing ? bumpMeta({ ...existing, ...column }, getClientId()) : normalizeColumn(column)
    setColumns({ ...columns, [column.id]: nextCol })
    markDirtyAndScheduleSync()
}

export function addColumn(column: Column): void {
    const { columns, setColumns } = useColumns.getState()
    setColumns({ ...columns, [column.id]: normalizeColumn(column) })
    markDirtyAndScheduleSync()
}

export function deleteColumnsByIds(ids: string[]): void {
    if (!ids.length) return
    const { columns, setColumns } = useColumns.getState()
    const { tombstones, setTombstones } = useTombstones.getState()
    const tomb = {
        boards: { ...tombstones.boards },
        columns: { ...tombstones.columns },
        tasks: { ...tombstones.tasks },
        subtasks: { ...tombstones.subtasks },
    }
    const next = { ...columns }
    for (const id of ids) {
        const c = columns[id]
        if (c) {
            tomb.columns[id] = tombstoneFromEntity(c)
            delete next[id]
        }
    }
    setColumns(next)
    setTombstones(tomb)
    markDirtyAndScheduleSync()
}

export function createColumnForBoard(name: string, boardId: string): Column {
    return createColumnEntity(name, boardId, getClientId())
}
