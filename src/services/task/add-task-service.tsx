import useTask from 'src/store/data/tasks'
import { Column, Data, Task, Board } from 'src/types/mock'

/**
 * @description Service to add a task to the store
 * @param {Task} task - The task to add
 */
const addTaskService = async ({ task }: { task: Task }) => {
    const { tasks, setTasks } = useTask.getState()

    setTasks({ ...tasks, [task.id]: task })
}

export default addTaskService
