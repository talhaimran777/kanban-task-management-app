'use client'

import { unstable_batchedUpdates } from 'react-dom'
import { validateReferentialIntegrity } from 'src/lib/github-sync/integrity'
import type { Snapshot } from 'src/lib/github-sync/schema'
import useActiveBoard from 'src/store/data/active-board'
import useBoards from 'src/store/data/boards'
import useColumns from 'src/store/data/columns'
import useSubtasks from 'src/store/data/subtasks'
import useTasks from 'src/store/data/tasks'
import useTombstones from 'src/store/data/tombstones'
import useSyncCoordinator from 'src/store/sync'

export function applySnapshot(snapshot: Snapshot): void {
    const integ = validateReferentialIntegrity(snapshot)
    if (!integ.ok) {
        throw new Error(
            `Integrity failed: ${integ.issues.map((i) => i.message).join('; ')}`
        )
    }

    useSyncCoordinator.getState().setSyncing(true)

    try {
        unstable_batchedUpdates(() => {
            useBoards.getState().setBoards({ ...snapshot.boards })
            useColumns.getState().setColumns({ ...snapshot.columns })
            useTasks.getState().setTasks({ ...snapshot.tasks })
            useSubtasks.getState().setSubtasks({ ...snapshot.subtasks })
            useTombstones.getState().setTombstones({
                boards: { ...snapshot.tombstones.boards },
                columns: { ...snapshot.tombstones.columns },
                tasks: { ...snapshot.tombstones.tasks },
                subtasks: { ...snapshot.tombstones.subtasks },
            })
            const aid = snapshot.activeBoardId ?? ''
            useActiveBoard.getState().setActiveBoardId(aid)
        })
    } finally {
        useSyncCoordinator.getState().setSyncing(false)
    }
}
