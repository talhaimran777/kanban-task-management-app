'use client'

import clsx from 'clsx'
import AddTaskIcon from 'images/icon-add-task-mobile.svg'
import Image from 'next/image'
import getCurrentBoard from 'services/board/getCurrentBoard'
import getColumnsByBoardId from 'services/column/getColumnsByBoardId'
import useDialog from 'store/dialog'
import { cn } from 'utils/cn'

const AddTaskButton = () => {
    const { setOpen, setType } = useDialog()
    const currentBoard = getCurrentBoard()
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
