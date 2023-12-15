import * as z from 'zod'

const addBoardFormSchema = z.object({
  boardName: z.string().min(2, {
    message: 'Board name must be at least 2 characters.',
  }),
})

export default addBoardFormSchema
