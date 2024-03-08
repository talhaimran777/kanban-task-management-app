import useColumns from 'src/store/data/columns'
import { Column } from 'src/types/mock'

/**
 * @description Retrieves all columns associated with a specific board
 *
 * @param {string} boardId - The ID of the board whose columns are to be retrieved
 * @returns {Column[]} An array of columns associated with the specified board
 */
const getColumnsByBoardId = (boardId: string): Column[] => {
    const columns = useColumns.getState().columns
    return Object.values(columns).filter((column) => column.boardId === boardId)
}

export default getColumnsByBoardId
