'use client'

import Typography from 'src/components/ui/custom/typography'
import EditBoardForm from 'src/components/forms/edit-board-form'
import getCurrentBoard from 'src/services/board/get-current-board'
import getColumnsByBoardId from 'src/services/column/get-columns-by-board-id'
import useDialog from 'src/store/dialog'
import { Board } from 'src/types/mock'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/components/ui/dialog'

const EditBoardDialog = () => {
    const { open, type, setOpen, setType } = useDialog()
    const board = getCurrentBoard()
    const boardColumns = getColumnsByBoardId(board?.id || '')

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
                    <EditBoardForm
                        board={getCurrentBoard() as Board}
                        columns={boardColumns}
                    />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default EditBoardDialog
