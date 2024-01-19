import useColumns from 'store/data/columns'
import { Column } from 'types/mock/v2'
import { v4 as uuidv4 } from 'uuid'

const editColumnsService = (columns: Column[], boardId: string) => {
    const { columns: appColumns, setColumns } = useColumns.getState()

    const otherColumns = appColumns.filter(
        (column) => column.boardId !== boardId
    )

    const updatedColumns = columns.map((column) => {
        if (column.id === '') {
            return {
                ...column,
                id: uuidv4(),
            }
        } else {
            return {
                ...column,
            }
        }
    })

    setColumns([...otherColumns, ...updatedColumns])
}

export default editColumnsService
