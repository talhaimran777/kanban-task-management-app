'use client'

import BoardColumns from 'src/components/others/board/board-columns'
import Button from 'src/components/ui/custom/button'
import Typography from 'src/components/ui/custom/typography'
import { Skeleton } from 'src/components/ui/skeleton'
import getCurrentBoard from 'src/services/board/get-current-board'
import getColumnsByBoardId from 'src/services/column/get-columns-by-board-id'
import { useStore } from 'src/store/data/hooks'
import useBound from 'src/store/data/hydrated'
import useDialog from 'src/store/dialog'
import { Column } from 'src/types/mock'

const BoardInfo = () => {
    const { setOpen, setType } = useDialog()
    const hydrated = useStore(useBound, (state) => state.hydrated)
    const currentBoard = getCurrentBoard()

    if (!hydrated) {
        return (
            <div className='flex gap-6 h-full w-full px-6 overflow-auto'>
                {[...Array(2)].map((_, index) => (
                    <div
                        key={index}
                        className='max-w-[280px] min-w-[280px] my-6 flex flex-col gap-6'
                    >
                        <Skeleton className='min-h-[24px] w-[100px]' />
                        {[...Array(2)].map((_, index) => (
                            <Skeleton key={index} className='h-36' />
                        ))}
                    </div>
                ))}
            </div>
        )
    }

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
    if (!!boardColumns.length) {
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
