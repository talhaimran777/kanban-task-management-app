import BoardMenuItem from 'src/components/ui/custom/board-menu-item'
import { Board } from 'src/types/mock'

const BoardList = ({ boards }: { boards: Board[] }) => {
    return boards.map((board, index) => (
        <BoardMenuItem key={index} board={board} />
    ))
}

export default BoardList
