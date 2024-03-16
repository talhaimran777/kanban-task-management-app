import * as z from 'zod'

const taskFormSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, {
        message: 'Task title must be at least 2 characters.',
    }),
    description: z.string().min(10, {
        message: 'Task description must be at least 10 characters.',
    }),
    subtasks: z
        .array(
            z.object({
                id: z.string().optional(), // Gets used when updating subtask
                name: z
                    .string()
                    .min(2, 'Subtask must contains atleast 2 characters.'),
                isCompleted: z.boolean().optional(), // Gets used when updating subtask
            })
        )
        .optional(),
    status: z.string().min(1, { message: 'Status is required!' }),
})

export default taskFormSchema
