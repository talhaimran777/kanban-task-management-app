'use client'

import clsx from 'clsx'
import AddTaskIcon from 'images/icon-add-task-mobile.svg'
import Image from 'next/image'
import useCurrentBoard from 'src/services/board/get-current-board'
import getColumnsByBoardId from 'src/services/column/get-columns-by-board-id'
import useDialog from 'src/store/dialog'
import { cn } from 'src/utils/cn'

const AddTaskButton = () => {
    const { setOpen, setType } = useDialog()
    const currentBoard = useCurrentBoard()
    const boardColumns = getColumnsByBoardId(currentBoard?.id || '')

    let disabled = false

    if (boardColumns.length === 0) {
        disabled = true
    }

    return (
        <button
            disabled={disabled}
            onClick={() => {
                setOpen(true)
                setType('add-task-dialog')
            }}
            className={cn(
                'bg-purple-primary py-[10px] px-[18px] rounded-full cursor-pointer',
                clsx({ 'bg-purple-secondary': disabled })
            )}
        >
            <Image
                src={AddTaskIcon}
                alt='Add Task Icon'
                height={12}
                width={12}
            />
        </button>
    )
}

export default AddTaskButton
