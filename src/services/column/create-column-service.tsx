import { Column } from 'src/types/mock'
import { v4 as uuidv4 } from 'uuid'

/**
 * @description Creates a new column with a unique ID
 *
 * @param {string} name - The name of the new column
 * @param {string} boardId - The ID of the board that the new column belongs to
 * @returns {Column} The new column
 */
const createColumnService = (name: string, boardId: string): Column => {
    const column: Column = {
        id: uuidv4(),
        name,
        boardId,
    }

    return column
}

export default createColumnService
