'use client'

import Typography from 'src/components/ui/custom/typography'
import AddBoardForm from 'src/components/forms/add-board-form'
import useDialog from 'src/store/dialog'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/components/ui/dialog'

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
            <DialogContent className='p-6 max-h-[calc(100vh-5%)] overflow-auto'>
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
