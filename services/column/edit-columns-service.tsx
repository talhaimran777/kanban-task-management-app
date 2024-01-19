import useColumns from 'store/data/columns'
import { Column } from 'types/mock/v2'
import { v4 as uuidv4 } from 'uuid'

/**
 * @description Updates the columns of a specific board
 *
 * @param {Column[]} columns - Updated columns of the board
 * @param {string} boardId - The ID of the board whose columns are to be updated
 */
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
