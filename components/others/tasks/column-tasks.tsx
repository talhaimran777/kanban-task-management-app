import ColumnTask from 'others/tasks/column-task'
import { Task } from 'types/mock'

const ColumnTasks = ({ tasks }: { tasks: Task[] }) => {
  return tasks.map((task) => <ColumnTask task={task} />)
}

export default ColumnTasks
