'use client'

import BoardList from 'src/components/ui/custom/board-list'
import CreateBoardMenuItem from 'src/components/ui/custom/create-board-menu-item'
import ThemeToggler from 'src/components/ui/custom/theme-toggler'
import Typography from 'src/components/ui/custom/typography'
import useDialog from 'src/store/dialog'
import { Board } from 'src/types/mock'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/components/ui/dialog'

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
            <DialogContent className='max-h-[calc(100vh-5%)] overflow-auto'>
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
