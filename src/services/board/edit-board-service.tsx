import useBoards from 'src/store/data/boards'
import { Board } from 'src/types/mock'

/**
 * @description This function is used to update the board object & updates the application state
 *
 * @param {Board} board - The board object that needs to be updated
 */
const editBoardService = (board: Board) => {
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
