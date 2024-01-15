import useColumns from 'store/data/columns'
import { Column } from 'types/mock/v2'

const getColumnsByBoardId = (boardId: string): Column[] => {
    const columns = useColumns.getState().columns
    const column = columns.filter((column) => column.boardId === boardId)

    return column
}

export default getColumnsByBoardId
