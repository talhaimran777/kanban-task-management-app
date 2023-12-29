'use client'

import BoardList from 'custom/board-list'
import CreateBoardMenuItem from 'custom/create-board-menu-item'
import ThemeToggler from 'custom/theme-toggler'
import Typography from 'custom/typography'
import useDialog from 'store/dialog'
import { Board } from 'types/mock'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'ui/dialog'

const MobileMenuDialog = ({ boards }: { boards: Board[] }) => {
    const { open, type, setOpen, setType } = useDialog()

    return (
        <Dialog
            open={open && type === 'mobile-menu-dialog'}
            onOpenChange={() => {
                setOpen(false)
                setType('')
            }}
        >
            <DialogContent>
                <DialogTitle className='mx-6 mt-4'>
                    <Typography
                        text={`All Boards (${boards.length})`}
                        variant='heading'
                        size='small'
                        className='text-grey-ternary uppercase tracking-widest'
                    />
                </DialogTitle>
                <DialogDescription>
                    <BoardList boards={boards} />
                    <CreateBoardMenuItem />
                    <ThemeToggler />
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default MobileMenuDialog
