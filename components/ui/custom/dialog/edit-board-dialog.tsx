'use client'

import Typography from 'custom/typography'
import EditBoardForm from 'forms/edit-board-form'
import getCurrentBoard from 'services/board/getCurrentBoard'
import getColumnsByBoardId from 'services/column/getColumnsByBoardId'
import useDialog from 'store/dialog'
import { Board } from 'types/mock/v2'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'ui/dialog'

const EditBoardDialog = () => {
    const { open, type, setOpen, setType } = useDialog()
    const board = getCurrentBoard();
    const boardColumns = getColumnsByBoardId(board?.id || "");

    return (
        <Dialog
            open={open && type === 'edit-board-dialog'}
            onOpenChange={() => {
                setOpen(false)
                setType('')
            }}
        >
            <DialogContent className='p-6 max-h-[calc(100vh-5%)] overflow-auto'>
                <DialogTitle className='flex justify-between items-center'>
                    <Typography
                        text='Edit Board'
                        variant='heading'
                        size='large'
                        className='text-black dark:text-white capitalize'
                    />
                </DialogTitle>
                <DialogDescription>
                    <EditBoardForm board={getCurrentBoard() as Board} columns={boardColumns} />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default EditBoardDialog
