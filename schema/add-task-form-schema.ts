import * as z from 'zod'

const addTaskFormSchema = z.object({
    name: z.string().min(2, {
        message: 'Task name must be at least 2 characters.',
    }),
    description: z.string().min(10, {
        message: 'Task description must be at least 10 characters.',
    }),
    subtasks: z
        .array(
            z.object({
                name: z
                    .string()
                    .min(2, 'Subtask must contains atleast 2 characters'),
            })
        )
        .optional(),
    status: z.enum(['todo', 'doing', 'done']),
})

export default addTaskFormSchema
