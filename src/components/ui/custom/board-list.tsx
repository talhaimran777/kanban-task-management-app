import BoardMenuItem from 'src/components/ui/custom/board-menu-item'
import { Board, Boards } from 'src/types/mock'

const BoardList = ({ boards }: { boards: Boards }) => {
    return Object.keys(boards).map((boardId) => (
        <BoardMenuItem key={boardId} board={boards[boardId] as Board} />
    ))
}

export default BoardList
