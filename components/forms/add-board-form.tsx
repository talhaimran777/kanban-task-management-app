'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Button from 'custom/button'
import FormInputGroup from 'custom/form/form-input-group'
import { useForm } from 'react-hook-form'
import addBoardFormSchema from 'schema/add-board-form-schema'
import { Form } from 'ui/form'
import { z } from 'zod'

const AddBoardForm = () => {
  const form = useForm<z.infer<typeof addBoardFormSchema>>({
    resolver: zodResolver(addBoardFormSchema),
    defaultValues: {
      boardName: '',
    },
  })

  function onSubmit(values: z.infer<typeof addBoardFormSchema>) {
    if (values) {
      // Do something with the values
      // and close dialog.
      //
      // Create a global state to manage open/close dialogs
      // document.querySelector('#close-create-board-dialog')?.click()
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6 mt-2'
      >
        <FormInputGroup
          name='boardName'
          label='Board Name'
          placeholder='e.g. Web Design'
          control={form.control}
        />

        <Button
          type='submit'
          variant='primary'
          size='small'
          fluid={true}
          text='Create New Board'
        />
      </form>
    </Form>
  )
}

export default AddBoardForm
