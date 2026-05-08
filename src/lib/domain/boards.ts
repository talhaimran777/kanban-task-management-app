import { getClientId } from 'src/lib/device/client-id'
import createColumnEntity from 'src/lib/domain/column-factory'
import { bumpMeta, createMeta, tombstoneFromEntity } from 'src/lib/domain/meta'
import boardFormSchema from 'src/schema/board-form-schema'
import useActiveBoard from 'src/store/data/active-board'
import useBoards from 'src/store/data/boards'
import useColumns from 'src/store/data/columns'
import useSubtasks from 'src/store/data/subtasks'
import useTasks from 'src/store/data/tasks'
import { markDirtyAndScheduleSync } from 'src/lib/github-sync/scheduler'
import useTombstones from 'src/store/data/tombstones'
import type { Board } from 'src/types/mock'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

export function makeBoardActive(boardId: string): void {
    useActiveBoard.getState().setActiveBoardId(boardId)
}

export function addBoard(board: Board): void {
    const { boards, setBoards } = useBoards.getState()
    setBoards({ ...boards, [board.id]: board })
    markDirtyAndScheduleSync()
}

export function createBoardFromForm(values: z.infer<typeof boardFormSchema>): Board {
    const cid = getClientId()
    const meta = createMeta(cid)
    const board: Board = {
        id: uuidv4(),
        name: values.name,
        ...meta,
    }

    const columnsPayload = values.columns ?? []
    const { columns, setColumns } = useColumns.getState()
    const nextCols = { ...columns }
    for (const col of columnsPayload) {
        const column = createColumnEntity(col.name, board.id, cid)
        nextCols[column.id] = column
    }
    setColumns(nextCols)

    addBoard(board)
    return board
}

export function updateBoardName(boardId: string, name: string): void {
    const { boards, setBoards } = useBoards.getState()
    const b = boards[boardId]
    if (!b) return
    const next = bumpMeta({ ...b, name }, getClientId())
    setBoards({ ...boards, [boardId]: next })
    markDirtyAndScheduleSync()
}

export function deleteBoardCascade(boardId: string): void {
    const { boards, setBoards } = useBoards.getState()
    const { columns, setColumns } = useColumns.getState()
    const { tasks, setTasks } = useTasks.getState()
    const { subtasks, setSubtasks } = useSubtasks.getState()
    const { tombstones, setTombstones } = useTombstones.getState()

    const tomb = {
        boards: { ...tombstones.boards },
        columns: { ...tombstones.columns },
        tasks: { ...tombstones.tasks },
        subtasks: { ...tombstones.subtasks },
    }

    const columnIds = Object.keys(columns).filter((cid) => columns[cid].boardId === boardId)
    const taskIds = Object.keys(tasks).filter((tid) =>
        columnIds.includes(tasks[tid].columnId)
    )
    const subIds = Object.keys(subtasks).filter((sid) => taskIds.includes(subtasks[sid].taskId))

    const nextSubs = { ...subtasks }
    for (const sid of subIds) {
        const st = subtasks[sid]
        tomb.subtasks[sid] = tombstoneFromEntity(st)
        delete nextSubs[sid]
    }

    const nextTasks = { ...tasks }
    for (const tid of taskIds) {
        const t = tasks[tid]
        tomb.tasks[tid] = tombstoneFromEntity(t)
        delete nextTasks[tid]
    }

    const nextCols = { ...columns }
    for (const cid of columnIds) {
        const c = columns[cid]
        tomb.columns[cid] = tombstoneFromEntity(c)
        delete nextCols[cid]
    }

    const board = boards[boardId]
    if (board) {
        tomb.boards[boardId] = tombstoneFromEntity(board)
    }

    const nextBoards = { ...boards }
    delete nextBoards[boardId]

    setSubtasks(nextSubs)
    setTasks(nextTasks)
    setColumns(nextCols)
    setBoards(nextBoards)
    setTombstones(tomb)

    const { activeBoardId, setActiveBoardId } = useActiveBoard.getState()
    if (activeBoardId === boardId) {
        setActiveBoardId('')
    }

    markDirtyAndScheduleSync()
}
