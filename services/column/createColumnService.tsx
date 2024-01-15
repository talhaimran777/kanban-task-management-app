import boardFormSchema from 'schema/board-form-schema'
import { Column } from 'types/mock/v2'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

const createColumnService = ({
    name,
    boardId,
}: {
    name: string
    boardId: string
}): Column => {
    const column: Column = {
        id: uuidv4(),
        name,
        boardId,
    }

    return column
}

export default createColumnService
