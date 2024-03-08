import taskFormSchema from 'src/schema/task-form-schema'
import { Subtask, Task } from 'src/types/mock'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

export const createTaskService = ({
    values,
}: {
    values: z.infer<typeof taskFormSchema>
}): [Task, Subtask[]] => {
    const task: Task = {
        id: uuidv4(),
        title: values.title,
        description: values.description,
        columnId: values.status, // values.status will contain the columnId
    }

    // TODO: Extract this to a service, createSubtaskService that will list of subtask titles & taskId
    const subtasks =
        values.subtasks?.map((subtask) => ({
            id: uuidv4(),
            title: subtask.name,
            isCompleted: false,
            taskId: task.id,
        })) ?? []

    return [task, subtasks]
}
