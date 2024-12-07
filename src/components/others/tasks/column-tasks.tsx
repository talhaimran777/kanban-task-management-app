import ColumnTask from 'src/components/others/tasks/column-task'
import { Task } from 'src/types/mock'

const ColumnTasks = ({ tasks }: { tasks: Task[] }) => {
    return (
        <div className='overflow-auto flex flex-col gap-6'>
            {tasks.map((task) => (
                <ColumnTask key={task.id} task={task} />
            ))}
        </div>
    )
}

export default ColumnTasks
