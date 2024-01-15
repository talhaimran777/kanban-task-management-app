import boardFormSchema from 'schema/board-form-schema'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { Board, Column } from 'types/mock/v2'
import createColumnService from 'services/column/createColumnService'

export const createBoardService = ({
    values,
}: {
    values: z.infer<typeof boardFormSchema>
}) => {
    const board: Board = {
        id: uuidv4(),
        name: values.name,
    }

    const columns: Column[] = []

    if (values.columns) {
        values.columns.forEach((column) => {
            columns.push(
                createColumnService({
                    name: column.name,
                    boardId: board.id,
                })
            )
        })
    }

    return [board, columns] as [Board, Column[]]
}
