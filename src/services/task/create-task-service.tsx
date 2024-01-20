import taskFormSchema from 'src/schema/task-form-schema'
import { Task } from 'src/types/mock'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

export const createTaskService = ({
    values,
}: {
    values: z.infer<typeof taskFormSchema>
}): Task => {
    return {
        id: uuidv4(),
        title: values.title,
        description: values.description,
        status: values.status,
        columnId: '',
    }
    // const task: Task = {
    //     title: values.title,
    //     description: values.description,
    //     status: values.status,
    // }
    //
    // if (generateNewId) {
    //     task.id = uuidv4()
    // }
    //
    // const subtasks: Subtask[] = []
    //
    // if (values.subtasks) {
    //     values.subtasks.forEach((subtask) => {
    //         subtasks.push({
    //             id: uuidv4(),
    //             title: subtask.name,
    //             isCompleted: false,
    //         })
    //     })
    // }
    //
    // return task
}
