'use client'

import Typography from 'custom/typography'
import AddTaskForm from 'forms/add-task-form'
import useDialog from 'store/dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from 'ui/dialog'

const AddTaskDialog = () => {
  const { open, type, setOpen, setType } = useDialog()

  return (
    <Dialog
      open={open && type === 'add-task-dialog'}
      onOpenChange={() => {
        setOpen(false)
        setType('')
      }}
    >
      <DialogContent className='p-6 max-h-[calc(100vh-5%)] overflow-auto'>
        <DialogTitle className='flex justify-between items-center'>
          <Typography
            text='add new task'
            variant='heading'
            size='large'
            className='text-black dark:text-white capitalize'
          />
        </DialogTitle>
        <DialogDescription>
          <AddTaskForm />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default AddTaskDialog
