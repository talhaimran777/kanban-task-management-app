'use client'

import BoardList from 'src/components/ui/custom/board-list'
import CreateBoardMenuItem from 'src/components/ui/custom/create-board-menu-item'
import ThemeToggler from 'src/components/ui/custom/theme-toggler'
import Typography from 'src/components/ui/custom/typography'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from 'src/components/ui/dialog'
import useDialog from 'src/store/dialog'
import { Boards } from 'src/types/mock'

const MobileMenuDialog = ({ boards }: { boards: Boards }) => {
    const { open, type, setOpen, setType } = useDialog()

    return (
        <Dialog
            open={open && type === 'mobile-menu-dialog'}
            onOpenChange={(open) => {
                setOpen(open)
                setType('')
            }}
        >
            <DialogContent className='max-h-[calc(100vh-5%)] overflow-auto'>
                <DialogTitle className='mx-6 mt-4'>
                    <Typography
                        text={`All Boards (${Object.keys(boards).length})`}
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
