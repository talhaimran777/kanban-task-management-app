import Typography from 'custom/typography'
import React, { ReactNode } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from 'ui/dialog'
import AddBoardForm from 'forms/add-board-form'

const AddBoardDialog = ({ trigger }: { trigger: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className='p-6'>
        <DialogTitle className='flex justify-between items-center'>
          <Typography
            text='Add New Board'
            variant='heading'
            size='large'
            className='text-black dark:text-white capitalize'
          />
          <DialogClose id='close-create-board-dialog'></DialogClose>
        </DialogTitle>
        <DialogDescription>
          <AddBoardForm />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default AddBoardDialog
