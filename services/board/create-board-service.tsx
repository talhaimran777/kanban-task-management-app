import boardFormSchema from 'schema/board-form-schema'
import createColumnService from 'services/column/create-column-service'
import { Board, Column } from 'types/mock/v2'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

/**
 * @description Creates a new board and its associated columns
 *
 * @param {z.infer<typeof boardFormSchema>} values - Contains board name & column names
 * @returns {[Board, Column[]]} A tuple containing new board and its associated columns
 */
export const createBoardService = (
    values: z.infer<typeof boardFormSchema>
): [Board, Column[]] => {
    const board: Board = {
        id: uuidv4(),
        name: values.name,
    }

    const columns: Column[] = []

    values.columns &&
        values.columns.forEach((column) => {
            columns.push(createColumnService(column.name, board.id))
        })

    return [board, columns] as [Board, Column[]]
}
