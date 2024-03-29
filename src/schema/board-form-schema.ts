import * as z from 'zod'

const boardFormSchema = z.object({
    name: z.string().min(2, {
        message: 'Board name must be at least 2 characters.',
    }),
    columns: z
        .array(
            z.object({
                id: z.string(),
                name: z
                    .string()
                    .min(2, 'Column name must contains atleast 2 characters'),
            })
        )
        .optional(),
})

export default boardFormSchema
