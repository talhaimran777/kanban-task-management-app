import useColumns from 'store/data/columns'
import { Column } from 'types/mock/v2'

/**
 * @description Adds new columns to the existing columns
 *
 * @param {Column[]} columns - The new columns to be added
 */
const addColumnsService = (columns: Column[]) => {
    const { columns: oldColumns, setColumns } = useColumns.getState()

    setColumns([...oldColumns, ...columns])
}

export default addColumnsService
