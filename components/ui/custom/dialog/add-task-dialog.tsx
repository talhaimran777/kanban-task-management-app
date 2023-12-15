import Typography from 'custom/typography'
import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from 'ui/dialog'
import AddTaskForm from 'forms/add-task-form'

const AddTaskDialog = ({ trigger }: { trigger: ReactNode }) => {
  return (
    <Dialog>
      {trigger}
      <DialogContent className='p-6 max-h-[calc(100vh-5%)] overflow-auto'>
        <DialogTitle className='flex justify-between items-center'>
          <Typography
            text='add new task'
            variant='heading'
            size='large'
            className='text-black dark:text-white capitalize'
          />
          <DialogClose id='close-create-task-dialog'></DialogClose>
        </DialogTitle>
        <DialogDescription>
          <AddTaskForm />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskDialog
