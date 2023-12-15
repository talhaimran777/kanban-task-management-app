import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from 'ui/dialog'
import { ReactNode } from 'react'
import { Board } from 'types/mock'
import BoardList from 'custom/board-list'
import ThemeToggler from 'custom/theme-toggler'
import CreateBoardMenuItem from 'custom/create-board-menu-item'
import Typography from 'custom/typography'

const MobileMenuDialog = ({
  boards,
  trigger,
}: {
  boards: Board[]
  trigger: ReactNode
}) => {
  return (
    <Dialog>
      {trigger}
      <DialogContent>
        <DialogTitle className='mx-6 mt-4'>
          <Typography
            text={`All Boards (${boards.length})`}
            variant='heading'
            size='small'
            className='text-grey-ternary uppercase tracking-widest'
          />
          <DialogClose id='close-mobile-menu-dialog'></DialogClose>
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
