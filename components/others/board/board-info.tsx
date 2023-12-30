'use client'

import Button from 'custom/button'
import Typography from 'custom/typography'
import BoardColumns from 'others/board/board-columns'
import useData from 'store/data'
import useDialog from 'store/dialog'
import { Column } from 'types/mock'

const BoardInfo = () => {
    const { selectedBoard, boards } = useData((state) => state.data)
    const { setOpen, setType } = useDialog()

    const currentBoard = boards.find((board) => board.id === selectedBoard)

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

    const boardColumns = currentBoard.columns as Column[]

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
