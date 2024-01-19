import BoardMenuItem from 'custom/board-menu-item'
import { Board } from 'types/mock/v2'

const BoardList = ({ boards }: { boards: Board[] }) => {
    return boards.map((board, index) => (
        <BoardMenuItem key={index} board={board} />
    ))
}

export default BoardList
