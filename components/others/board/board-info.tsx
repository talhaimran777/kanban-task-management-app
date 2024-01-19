'use client'

import Button from 'custom/button'
import Typography from 'custom/typography'
import BoardColumns from 'others/board/board-columns'
import getCurrentBoard from 'services/board/get-current-board'
import getColumnsByBoardId from 'services/column/get-columns-by-board-id'
import useDialog from 'store/dialog'
import { Column } from 'types/mock/v2'

const BoardInfo = () => {
    const { setOpen, setType } = useDialog()
    const currentBoard = getCurrentBoard()

    // If no board found
    if (!currentBoard) {
        return (
            <div className='text-center'>
                <Typography
                    text='No Available Boards'
                    variant='heading'
                    size='large'
                    className='mb-6 text-grey-ternary'
                />
            </div>
        )
    }

    const boardColumns = getColumnsByBoardId(currentBoard.id)

    // If board contains columns
    if (!!boardColumns?.length) {
        return <BoardColumns columns={boardColumns as Column[]} />
    }

    // If board does not contains columns
    return (
        <div className='text-center'>
            <Typography
                text='This board is empty. Create a new column to get started.'
                variant='heading'
                size='large'
                className='mb-6 text-grey-ternary'
            />
            <Button
                text='Add New Column'
                variant='primary'
                size='large'
                onClick={() => {
                    setType('edit-board-dialog')
                    setOpen(true)
                }}
            />
        </div>
    )
}

export default BoardInfo
