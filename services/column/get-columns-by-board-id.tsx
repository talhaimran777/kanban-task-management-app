import useColumns from 'store/data/columns'
import { Column } from 'types/mock/v2'

/**
 * @description Retrieves all columns associated with a specific board
 *
 * @param {string} boardId - The ID of the board whose columns are to be retrieved
 * @returns {Column[]} An array of columns associated with the specified board
 */
const getColumnsByBoardId = (boardId: string): Column[] => {
    const columns = useColumns.getState().columns
    const column = columns.filter((column) => column.boardId === boardId)

    return column
}

export default getColumnsByBoardId
