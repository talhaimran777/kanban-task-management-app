import useActiveBoard from 'store/data/active-board'

const makeBoardActive = (boardId: string) => {
    const { setActiveBoardId } = useActiveBoard.getState()

    setActiveBoardId(boardId)
}

export default makeBoardActive
