import useTasks from 'src/store/data/tasks'

/**
 * @description Delete a task by its id & update the store
 * @param {string} id - The task id
 */
const deleteTaskById = async ({ id }: { id: string }) => {
    if (!id) {
        return
    }

    const tasks = useTasks.getState().tasks

    // TODO: Also delete it's associated subtasks
    delete tasks[id]

    useTasks.setState({ tasks })
}

export default deleteTaskById
