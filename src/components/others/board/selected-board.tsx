'use client'

import MobileMenuDialog from 'src/components/ui/custom/dialog/mobile-menu-dialog'
import Typography from 'src/components/ui/custom/typography'
import ChevronDownIcon from 'images/icon-chevron-down.svg'
import Image from 'next/image'
import getCurrentBoard from 'src/services/board/get-current-board'
import useBoards from 'src/store/data/boards'
import useDialog from 'src/store/dialog'

const SelectedBoard = () => {
    const currentBoard = getCurrentBoard()
    const boards = useBoards((state) => state.boards)

    const { setOpen, setType } = useDialog()

    return (
        <div>
            <div
                className='flex justify-between items-center gap-2 cursor-pointer'
                onClick={() => {
                    setOpen(true)
                    setType('mobile-menu-dialog')
                }}
            >
                <Typography
                    text={
                        boards.find((board) => board.id === currentBoard?.id)
                            ?.name || ('No Available Boards' as string)
                    }
                    size='large'
                    variant='heading'
                />
                <Image
                    src={ChevronDownIcon}
                    alt='ChevronDownIcon'
                    height={12}
                    width={12}
                />
            </div>
            <MobileMenuDialog boards={boards} />
        </div>
    )
}

export default SelectedBoard
