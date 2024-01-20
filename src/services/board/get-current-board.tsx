import useActiveBoard from 'src/store/data/active-board'
import useBoards from 'src/store/data/boards'
import { Board } from 'src/types/mock'

/**
 * @description Retrieves the current active board
 * @returns {Board | undefined} The current active board if found, or `undefined`
 */
const getCurrentBoard = (): Board | undefined => {
    const boards = useBoards.getState().boards
    const activeBoardId = useActiveBoard.getState().activeBoardId
    const currentBoard = boards.find((board) => board.id === activeBoardId)

    return currentBoard
}

export default getCurrentBoard
