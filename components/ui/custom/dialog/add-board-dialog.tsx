import Typography from 'custom/typography'
import AddBoardForm from 'forms/add-board-form'
import useDialog from 'store/dialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from 'ui/dialog'

const AddBoardDialog = () => {
  const { open, type, setOpen, setType } = useDialog()

  return (
    <Dialog
      open={open && type === 'add-board-dialog'}
      onOpenChange={() => {
        setOpen(false)
        setType('')
      }}
    >
      <DialogContent className='p-6'>
        <DialogTitle className='flex justify-between items-center'>
          <Typography
            text='Add New Board'
            variant='heading'
            size='large'
            className='text-black dark:text-white capitalize'
          />
        </DialogTitle>
        <DialogDescription>
          <AddBoardForm />
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default AddBoardDialog
