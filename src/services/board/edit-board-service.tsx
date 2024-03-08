import useBoards from 'src/store/data/boards'
import { Board } from 'src/types/mock'

/**
 * @description This function is used to update the board object & updates the application state
 *
 * @param {Board} board - The board object that needs to be updated
 */
const editBoardService = (board: Board) => {
    const { boards, setBoards } = useBoards.getState()

    setBoards({ ...boards, [board.id]: board })
}

export default editBoardService
