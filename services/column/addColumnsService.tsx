import useColumns from 'store/data/columns'
import { Column } from 'types/mock/v2'

const addColumnsService = ({ columns }: { columns: Column[] }) => {
    const { columns: oldColumns, setColumns } = useColumns.getState()

    setColumns([...oldColumns, ...columns])
}

export default addColumnsService
