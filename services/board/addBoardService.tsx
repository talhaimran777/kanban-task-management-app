import addBoardFormSchema from 'schema/add-board-form-schema'
import { Board, Column, Data } from 'types/mock'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

const addBoardService = async ({
    values,
    data,
    setData,
}: {
    values: z.infer<typeof addBoardFormSchema>
    data: Data
    setData: (type: Data) => void
}) => {
    if (values) {
        const board: Board = {
            id: uuidv4(),
            name: values.boardName,
            isActive: true,
        }

        const columns = values.columns

        if (!!columns?.length) {
            board.columns = columns as Column[]
        }

        const appData: Data = {
            boards: [...data.boards, board],
            selectedBoard: data?.selectedBoard ?? board.id,
        }

        setData(appData)
    }
}

export default addBoardService
