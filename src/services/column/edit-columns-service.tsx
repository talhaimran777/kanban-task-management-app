import useColumns from 'src/store/data/columns'
import { Column } from 'src/types/mock'

/**
 * @description Updates the column
 *
 * @param {Column} column - Column to update
 */
const editColumnService = (column: Column) => {
    const { columns, setColumns } = useColumns.getState()

    setColumns({ ...columns, [column.id]: column })
}

export default editColumnService
