'use client'

import clsx from 'clsx'
import AddTaskIcon from 'images/icon-add-task-mobile.svg'
import Image from 'next/image'
import Button from 'src/components/ui/custom/button'
import Typography from 'src/components/ui/custom/typography'
import useCurrentBoard from 'src/services/board/get-current-board'
import getColumnsByBoardId from 'src/services/column/get-columns-by-board-id'
import useDialog from 'src/store/dialog'
import { cn } from 'src/utils'

const AddTaskButton = () => {
    const { setOpen, setType } = useDialog()
    const currentBoard = useCurrentBoard()
    const boardColumns = getColumnsByBoardId(currentBoard?.id || '')

    let disabled = false

    if (boardColumns.length === 0) {
        disabled = true
    }

    return (
        <Button
            type='button'
            variant='primary'
            size='small'
            fluid={true}
            text='Add New Task'
            className='flex gap-2 items-center'
            disabled={disabled}
            onClick={() => {
                setOpen(true)
                setType('add-task-dialog')
            }}
            icon={
                <Image
                    src={AddTaskIcon}
                    alt='Add Task Icon'
                    height={8}
                    width={8}
                />
            }
        />
    )
}

export default AddTaskButton
