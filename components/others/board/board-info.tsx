'use client'

import Button from 'custom/button'
import Typography from 'custom/typography'
import BoardColumns from 'others/board/board-columns'
import useData from 'store/data'
import { Column } from 'types/mock'

const BoardInfo = () => {
  const { currentBoard: boardName, boards } = useData((state) => state.data)
  const currentBoard = boards.find((board) => board.name === boardName)
  const boardColumns = currentBoard?.columns as Column[]

  return !!boardColumns ? (
    <BoardColumns columns={boardColumns as Column[]} />
  ) : (
    <div className='text-center'>
      <Typography
        text='This board is empty. Create a new column to get started.'
        variant='heading'
        size='large'
        className='mb-6 text-grey-ternary'
      />
      <Button text='Add New Column' variant='primary' size='large' />
    </div>
  )
}

export default BoardInfo
