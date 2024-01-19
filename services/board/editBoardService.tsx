import useData from 'store/data'
import { Board, Data } from 'types/mock'

const editBoardService = async (board: Board) => {
    const { data, setData } = useData.getState()

    const boards = data.boards.map((board) =>
        board.id === board.id ? board : board
    )

    const appData: Data = {
        ...data,
        boards: [...boards],
        selectedBoard: board.id,
    }

    setData(appData)
}

export default editBoardService
