import BoardColumn from 'src/components/others/board/board-column'
import ColumnCreator from 'src/components/others/board/column-creator'
import { Column } from 'src/types/mock'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const BoardColumns = ({ columns }: { columns: Column[] }) => {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className='flex gap-6 max-h-[calc(100vh-72px)] h-full w-full px-6 overflow-auto'>
                {columns.map((column, index) => (
                    <BoardColumn column={column} key={index} />
                ))}
                <ColumnCreator />
            </div>
        </DndProvider>
    )
}

export default BoardColumns
