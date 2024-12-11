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

import deleteBoardById from 'src/services/board/delete-board-by-id'
import useCurrentBoard from 'src/services/board/get-current-board'

const DeleteBoardDialog = () => {
    const { open, type, setType } = useDialog()
    const selectedBoard = useCurrentBoard()

    return (
        <Dialog
            open={open && type === 'delete-board-dialog'}
            onOpenChange={() => {}}
        >
            <DialogContent className='p-6 max-h-[calc(100vh-5%)] overflow-auto'>
                <DialogTitle className='flex justify-between items-center'>
                    <Typography
                        text='Delete this board?'
                        variant='heading'
                        size='large'
                        className='text-red-primary capitalize'
                    />
                </DialogTitle>

                <DialogDescription>
                    <Typography
                        text='Are you sure you want to delete this board?'
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
                                deleteBoardById({ id: selectedBoard?.id ?? '' })
                                setType('')
                            }}
                        />

                        <Button
                            type='button'
                            variant='secondary'
                            size='small'
                            fluid={true}
                            text='Cancel'
                            onClick={() => {
                                setType('')
                            }}
                        />
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteBoardDialog
