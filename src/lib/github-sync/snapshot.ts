'use client'

import { getClientId } from 'src/lib/device/client-id'
import {
    normalizeBoard,
    normalizeColumn,
    normalizeSubtask,
    normalizeTask,
} from 'src/lib/domain/meta'
import type { Snapshot } from 'src/lib/github-sync/schema'
import { SNAPSHOT_VERSION, emptyTombstones } from 'src/lib/github-sync/schema'
import useActiveBoard from 'src/store/data/active-board'
import useBoards from 'src/store/data/boards'
import useColumns from 'src/store/data/columns'
import useSubtasks from 'src/store/data/subtasks'
import useTasks from 'src/store/data/tasks'
import useTombstones from 'src/store/data/tombstones'

function cloneTombs<T>(t: T): T {
    return JSON.parse(JSON.stringify(t))
}

export function exportSnapshot(): Snapshot {
    const cid = getClientId()
    const boardsState = useBoards.getState().boards
    const columnsState = useColumns.getState().columns
    const tasksState = useTasks.getState().tasks
    const subtasksState = useSubtasks.getState().subtasks
    const tombRaw = useTombstones.getState().tombstones ?? emptyTombstones()

    const boards: Snapshot['boards'] = {}
    for (const id of Object.keys(boardsState)) {
        boards[id] = normalizeBoard(boardsState[id], cid)
    }
    const columns: Snapshot['columns'] = {}
    for (const id of Object.keys(columnsState)) {
        columns[id] = normalizeColumn(columnsState[id], cid)
    }
    const tasks: Snapshot['tasks'] = {}
    for (const id of Object.keys(tasksState)) {
        tasks[id] = normalizeTask(tasksState[id], cid)
    }
    const subtasks: Snapshot['subtasks'] = {}
    for (const id of Object.keys(subtasksState)) {
        subtasks[id] = normalizeSubtask(subtasksState[id], cid)
    }

    return {
        version: SNAPSHOT_VERSION,
        metadata: {
            exporterClientId: cid,
        },
        activeBoardId: useActiveBoard.getState().activeBoardId || undefined,
        boards,
        columns,
        tasks,
        subtasks,
        tombstones: cloneTombs(tombRaw),
    }
}
