'use client'

import Typography from 'custom/typography'
import EditBoardForm from 'forms/edit-board-form'
import useData from 'store/data'
import useDialog from 'store/dialog'
import { Board } from 'types/mock'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'ui/dialog'

const EditBoardDialog = () => {
    const { open, type, setOpen, setType } = useDialog()
    const { selectedBoard, boards } = useData((state) => state.data)

    return (
        <Dialog
            open={open && type === 'edit-board-dialog'}
            onOpenChange={() => {
                setOpen(false)
                setType('')
            }}
        >
            <DialogContent className='p-6'>
                <DialogTitle className='flex justify-between items-center'>
                    <Typography
                        text='Edit Board'
                        variant='heading'
                        size='large'
                        className='text-black dark:text-white capitalize'
                    />
                </DialogTitle>
                <DialogDescription>
                    <EditBoardForm
                        board={
                            boards.find(
                                (board) => board.id === selectedBoard
                            ) as Board
                        }
                    />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default EditBoardDialog
