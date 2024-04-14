'use client'

import VerticalEllipsisIcon from 'images/icon-vertical-ellipsis.svg'
import Image from 'next/image'
import ViewTaskForm from 'src/components/forms/view-task-form'
import Typography from 'src/components/ui/custom/typography'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/components/ui/dialog'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import { useStore } from 'src/store/data/hooks'
import useTasks from 'src/store/data/tasks'
import useDialog from 'src/store/dialog'

const ViewTaskDialog = () => {
    const { open, type, setOpen, setType } = useDialog()
    const task = useStore(useTasks, (state) => state.taskToView)

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
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Image
                                className='cursor-pointer'
                                src={VerticalEllipsisIcon}
                                alt='Vertical Ellipsis Icon'
                                height={4}
                                width={4}
                            />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem
                                onClick={() => {
                                    setOpen(true)
                                    setType('edit-task-dialog')
                                }}
                            >
                                Edit Task
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setOpen(true)
                                    setType('delete-task-dialog')
                                }}
                                className='text-red-primary'
                            >
                                Delete Task
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </DialogTitle>
                <DialogDescription>
                    <ViewTaskForm />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default ViewTaskDialog
