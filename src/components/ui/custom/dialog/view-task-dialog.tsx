'use client'

import Typography from 'src/components/ui/custom/typography'
import ViewTaskForm from 'src/components/forms/view-task-form'
import useDialog from 'src/store/dialog'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/components/ui/dialog'
import useTasks from 'src/store/data/tasks'
import { useStore } from 'src/store/data/hooks'

const ViewTaskDialog = () => {
    const { open, type, setOpen, setType } = useDialog()
    const task = useStore(useTasks, state => state.taskToView)

    return (
        <Dialog
            open={open && type === 'view-task-dialog'}
            onOpenChange={() => {
                setOpen(false)
                setType('')
            }}
        >
            <DialogContent className='p-6 max-h-[calc(100vh-5%)] overflow-auto'>
                <DialogTitle className='flex justify-between items-center'>
                    <Typography
                        text={task?.title ?? ''}
                        variant='heading'
                        size='large'
                        className='text-black dark:text-white capitalize'
                    />
                </DialogTitle>
                <DialogDescription>
                    <ViewTaskForm />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default ViewTaskDialog

