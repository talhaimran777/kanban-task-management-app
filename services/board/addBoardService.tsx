import boardFormSchema from 'schema/add-board-form-schema'
import useData from 'store/data'
import { Board, Column, Data } from 'types/mock'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

const addBoardService = async ({
    values,
}: {
    values: z.infer<typeof boardFormSchema>
}) => {
    const { data, setData } = useData.getState()

    if (values) {
        const board: Board = {
            id: uuidv4(),
            name: values.name,
        }

        const columns = values.columns

        if (!!columns?.length) {
            board.columns = columns as Column[]
        }

        const appData: Data = {
            ...data,
            boards: [...data.boards, board],
            selectedBoard: board.id,
        }

        setData(appData)
    }
}

export default addBoardService
