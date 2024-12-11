import useBoards from 'src/store/data/boards'

/**
 * @description Delete a board by its id & update the store
 * @param {string} id - The board id
 */
const deleteBoardById = async ({ id }: { id: string }) => {
    if (!id) {
        return
    }

    const { boards, setBoards } = useBoards.getState()

    // TODO: also delete all the things related to this board, like columns, tasks, etc.
    delete boards[id]

    setBoards(boards)
}

export default deleteBoardById
