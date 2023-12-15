import { Board } from 'types/mock'
import BoardMenuItem from 'custom/board-menu-item'

const BoardList = ({ boards }: { boards: Board[] }) => {
  return boards.map((board, index) => (
    <BoardMenuItem key={index} board={board} />
  ))
}

export default BoardList
