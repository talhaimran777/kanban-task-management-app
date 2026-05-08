import { LegacyRef } from 'react'
import { useDrop } from 'react-dnd'
import Typography from 'src/components/ui/custom/typography'
import { moveTask } from 'src/lib/domain/tasks'
import { useStore } from 'src/store/data/hooks'
import useTasks from 'src/store/data/tasks'
import { Column, Task, Tasks } from 'src/types/mock'
import { ItemTypes } from 'src/utils'
import ColumnTasks from '../tasks/column-tasks'

const getTasksByColumnId = (tasks: Tasks, columnId: string) => {
    return Object.values(tasks).filter((task) => task.columnId === columnId)
}

const BoardColumn = ({ column }: { column: Column }) => {
    const tasks = useStore(useTasks, (state) => state.tasks)
    const columnTasks = tasks && getTasksByColumnId(tasks, column.id)

    const [, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (task: Task) => {
            moveTask(task, column.id)
        },
    }))

    return (
        <div
            ref={drop as unknown as LegacyRef<HTMLDivElement>}
            className='max-w-[280px] min-w-[280px] my-6 flex flex-col gap-6'
        >
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
