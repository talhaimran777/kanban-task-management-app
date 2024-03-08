import useColumns from 'src/store/data/columns'
import { Column } from 'src/types/mock'

/**
 * @description Adds new column to the existing columns
 *
 * @param {Column} column - The new column to be added
 */
const addColumnService = (column: Column) => {
    const { columns, setColumns } = useColumns.getState()

    setColumns({ ...columns, [column.id]: column })
}

export default addColumnService
