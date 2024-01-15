import * as z from 'zod'

const taskFormSchema = z.object({
    title: z.string().min(2, {
        message: 'Task title must be at least 2 characters.',
    }),
    description: z.string().min(10, {
        message: 'Task description must be at least 10 characters.',
    }),
    subtasks: z
        .array(
            z.object({
                name: z
                    .string()
                    .min(2, 'Subtask must contains atleast 2 characters.'),
            })
        )
        .optional(),
    status: z.string().min(1, { message: 'Status is required!' }),
})

export default taskFormSchema
