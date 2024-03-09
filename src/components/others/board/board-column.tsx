import Typography from 'src/components/ui/custom/typography'
import { Column, Tasks } from 'src/types/mock'
import ColumnTasks from '../tasks/column-tasks'
import useTask from 'src/store/data/tasks'
import { useStore } from 'src/store/data/hooks'

// TODO: Extract this to a service file
const getTasksByColumnId = (tasks: Tasks, columnId: string) => {
    return Object.values(tasks).filter((task) => task.columnId === columnId)
}

const BoardColumn = ({ column }: { column: Column }) => {
    const tasks = useStore(useTask, (state) => state.tasks)
    const columnTasks = tasks && getTasksByColumnId(tasks, column.id)

    return (
        <div className='max-w-[280px] min-w-[280px] my-6 flex flex-col gap-6'>
            <Typography
                text={`${column.name} ${
                    columnTasks?.length ? `(${columnTasks.length})` : '(0)'
                }`}
                size='small'
                variant='heading'
                className='text-grey-ternary tracking-widest uppercase'
            />
            {columnTasks && <ColumnTasks tasks={columnTasks} />}
        </div>
    )
}

export default BoardColumn
