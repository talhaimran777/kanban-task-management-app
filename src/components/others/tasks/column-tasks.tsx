import ColumnTask from 'src/components/others/tasks/column-task'
import { Task } from 'src/types/mock'

const ColumnTasks = ({ tasks }: { tasks: Task[] }) => {
    return tasks.map((task, index) => <ColumnTask key={task.id} task={task} />)
}

export default ColumnTasks
