'use client'

import Typography from 'src/components/ui/custom/typography'
import useDialog from 'src/store/dialog'

import Button from 'src/components/ui/custom/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/components/ui/dialog'

import { deleteTaskCascade } from 'src/lib/domain/tasks'
import useTasks from 'src/store/data/tasks'

const DeleteTaskDialog = () => {
    const { open, type, setType } = useDialog()
    const { setTaskToView, taskToView: task } = useTasks((state) => state)

    return (
        <Dialog
            open={open && type === 'delete-task-dialog'}
            onOpenChange={() => {
                setType('view-task-dialog')
            }}
        >
            <DialogContent className='p-6 max-h-[calc(100vh-5%)] overflow-auto'>
                <DialogTitle className='flex justify-between items-center'>
                    <Typography
                        text='Delete this task?'
                        variant='heading'
                        size='large'
                        className='text-red-primary capitalize'
                    />
                </DialogTitle>

                <DialogDescription>
                    <Typography
                        // TODO: Change the text to the task title
                        text='Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.'
                        variant='heading'
                        size='small'
                    />

                    <div className='flex justify-between items-center gap-6 mt-6'>
                        <Button
                            type='button'
                            variant='danger'
                            size='small'
                            fluid={true}
                            text='Delete'
                            onClick={() => {
                                if (task?.id) {
                                    deleteTaskCascade(task.id)
                                }

                                setType('')
                                setTaskToView(null)
                            }}
                        />

                        <Button
                            type='button'
                            variant='secondary'
                            size='small'
                            fluid={true}
                            text='Cancel'
                            onClick={() => setType('view-task-dialog')}
                        />
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteTaskDialog
