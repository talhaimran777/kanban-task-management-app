import useBoards from 'store/data/boards'
import { Board } from 'types/mock/v2'

const editBoardService = async (board: Board) => {
    const { boards: appBoards, setBoards } = useBoards.getState()

    const updatedBoards = appBoards.map((appBoard) => {
        if (appBoard.id === board.id) {
            return board
        }
        return appBoard
    })

    setBoards(updatedBoards)
}

export default editBoardService
