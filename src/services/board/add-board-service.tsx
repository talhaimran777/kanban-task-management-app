import useBoards from 'src/store/data/boards'
import { Board } from 'src/types/mock'

/**
 * @description Adds a new board to the existing boards
 *
 * @param {Board} board - The new board to be added
 */
const addBoardService = (board: Board) => {
    const { boards, setBoards } = useBoards.getState()

    setBoards([...boards, board])
}

export default addBoardService
