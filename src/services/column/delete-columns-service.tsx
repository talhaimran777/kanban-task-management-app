import useColumns from 'src/store/data/columns'

/**
 * @description Removes columns from store by id
 *
 * @param {string[]} ids - Column ids to remove
 */
const deleteColumnsByIds = (ids: string[]) => {
    if (!ids.length) {
        return
    }

    const { columns, setColumns } = useColumns.getState()
    const next = { ...columns }
    ids.forEach((id) => {
        delete next[id]
    })
    setColumns(next)
}

export default deleteColumnsByIds
