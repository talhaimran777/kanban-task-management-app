import taskFormSchema from 'schema/task-form-schema'
import { SubTask, Task } from 'types/mock'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

export const createTaskService = ({
    values,
    generateNewId,
}: {
    values: z.infer<typeof taskFormSchema>
    generateNewId: boolean
}): Task => {
    const task: Task = {
        title: values.title,
        description: values.description,
        status: values.status,
    }

    if (generateNewId) {
        task.id = uuidv4()
    }

    const subtasks: SubTask[] = []

    if (values.subtasks) {
        values.subtasks.forEach((subtask) => {
            subtasks.push({
                id: uuidv4(),
                title: subtask.name,
                isCompleted: false,
            })
        })
    }

    return task
}
