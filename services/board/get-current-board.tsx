import useActiveBoard from 'store/data/active-board'
import useBoards from 'store/data/boards'
import { Board } from 'types/mock/v2'

/**
 * @description Retrieves the current active board
 * @returns {Board | undefined} The current active board if found, or `undefined`
 */
const getCurrentBoard = (): Board | undefined => {
    const boards = useBoards((state) => state.boards)
    const activeBoardId = useActiveBoard((state) => state.activeBoardId)
    const currentBoard = boards.find((board) => board.id === activeBoardId)

    return currentBoard
}

export default getCurrentBoard
