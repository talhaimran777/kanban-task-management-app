import useTasks from 'src/store/data/tasks'

/**
 * @description Delete a task by its id & update the store
 * @param {string} id - The task id
 */
const deleteTaskById = async ({ id }: { id: string }) => {
    if (!id) {
        return
    }

    const { tasks, setTasks } = useTasks.getState()

    // TODO: Also delete it's associated subtasks
    delete tasks[id]

    setTasks(tasks)
}

export default deleteTaskById
