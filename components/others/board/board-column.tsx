import Typography from 'custom/typography'
import ColumnTasks from 'others/tasks/column-tasks'
import { Column } from 'types/mock'

const BoardColumn = ({ column }: { column: Column }) => {
    return (
        <div className='min-w-[280px] my-6 flex flex-col gap-6'>
            <Typography
                text={`${column.name} ${
                    column.tasks?.length ? `(${column.tasks.length})` : '(0)'
                }`}
                size='small'
                variant='heading'
                className='text-grey-ternary tracking-widest uppercase'
            />
            {!!column.tasks?.length ? (
                <ColumnTasks tasks={column.tasks} />
            ) : (
                <Typography
                    text='No tasks found!'
                    size='small'
                    variant='heading'
                    className='text-grey-ternary tracking-widest uppercase'
                />
            )}
        </div>
    )
}

export default BoardColumn
