import useActiveBoard from 'src/store/data/active-board'
import useBoards from 'src/store/data/boards'
import useStore from 'src/store/data/hooks'
import { Board } from 'src/types/mock'

/**
 * @description Retrieves the current active board
 * @returns {Board | undefined} The current active board if found, or `undefined`
 */
const useCurrentBoard = (): Board | undefined => {
    const boards = useStore(useBoards, (state) => state.boards)
    const activeBoardId = useActiveBoard((state) => state.activeBoardId)

    if (!activeBoardId) {
        return undefined
    }

    if (!boards) {
        return undefined
    }

    return boards[activeBoardId]
}

export default useCurrentBoard
