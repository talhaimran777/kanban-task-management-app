import BoardColumn from 'src/components/others/board/board-column'
import ColumnCreator from 'src/components/others/board/column-creator'
import { Column } from 'src/types/mock'

const BoardColumns = ({ columns }: { columns: Column[] }) => {
    return (
        <div className='flex gap-6 max-h-[calc(100vh-72px)] h-full w-full px-6 overflow-auto'>
            {columns.map((column, index) => (
                <BoardColumn column={column} key={index} />
            ))}
            <ColumnCreator />
        </div>
    )
}

export default BoardColumns
