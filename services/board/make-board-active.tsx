import useActiveBoard from 'store/data/active-board'

/**
 * @description Sets the board active using the board id
 *
 * @param {string} boardId - The ID of the board to be set as active
 */
const makeBoardActive = (boardId: string) => {
    const { setActiveBoardId } = useActiveBoard.getState()

    setActiveBoardId(boardId)
}

export default makeBoardActive
