import useData from 'store/data'
import { Board, Data } from 'types/mock'

const editBoardService = async ({
    id,
    updatedBoard,
}: {
    id: string
    updatedBoard: Board
}) => {
    const { data, setData } = useData.getState()

    const boards = data.boards.map((board) =>
        board.id === id ? updatedBoard : board
    )

    const appData: Data = {
        ...data,
        boards: [...boards],
        selectedBoard: id,
    }

    setData(appData)
}

export default editBoardService
