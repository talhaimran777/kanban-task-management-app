import * as z from 'zod'

const viewTaskFormSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, {
        message: 'Task title must be at least 2 characters.',
    }),
    description: z.string().optional(),
    subtasks: z
        .array(
            z.object({
                id: z.string().optional(),
                name: z
                    .string()
                    .min(2, 'Subtask must contains atleast 2 characters.'),
                isCompleted: z.boolean().optional(),
            })
        )
        .optional(),
    status: z.string().optional()
})

export default viewTaskFormSchema
