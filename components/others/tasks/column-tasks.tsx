import ColumnTask from 'others/tasks/column-task'
import { Task } from 'types/mock/v2'

const ColumnTasks = ({ tasks }: { tasks: Task[] }) => {
    return tasks.map((task, index) => <ColumnTask key={index} task={task} />)
}

export default ColumnTasks
