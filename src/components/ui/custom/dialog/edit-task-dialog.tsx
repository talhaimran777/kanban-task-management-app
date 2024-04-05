'use client'

import EditTaskForm from 'src/components/forms/edit-task-form'
import Typography from 'src/components/ui/custom/typography'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/components/ui/dialog'
import useDialog from 'src/store/dialog'

const EditTaskDialog = () => {
    const { open, type, setOpen, setType } = useDialog()

    return (
        <Dialog
            open={open && type === 'edit-task-dialog'}
            onOpenChange={() => {
                setOpen(false)
                setType('')
            }}
        >
            <DialogContent className='p-6 max-h-[calc(100vh-5%)] overflow-auto'>
                <DialogTitle className='flex justify-between items-center'>
                    <Typography
                        text='edit task'
                        variant='heading'
                        size='large'
                        className='text-black dark:text-white capitalize'
                    />
                </DialogTitle>
                <DialogDescription>
                    <EditTaskForm />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default EditTaskDialog
