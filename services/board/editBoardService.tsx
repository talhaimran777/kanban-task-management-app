import boardFormSchema from 'schema/add-board-form-schema'
import useData from 'store/data'
import { Column, Data } from 'types/mock'
import { z } from 'zod'

const editBoardService = async ({
    values,
    boardId,
}: {
    values: z.infer<typeof boardFormSchema>
    boardId: string
}) => {
    const { data, setData } = useData.getState()

    const boards = data.boards.map((board) => {
        if (board.id === boardId) {
            board = {
                ...board,
                name: values.name,
                columns: values.columns as Column[] | undefined,
            }
        }

        return board
    })

    const appData: Data = {
        ...data,
        boards: [...boards],
    }

    setData(appData)
}

export default editBoardService
