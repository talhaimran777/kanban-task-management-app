'use client'

import MobileMenuDialog from 'src/components/ui/custom/dialog/mobile-menu-dialog'
import Typography from 'src/components/ui/custom/typography'
import ChevronDownIcon from 'images/icon-chevron-down.svg'
import Image from 'next/image'
import useCurrentBoard from 'src/services/board/get-current-board'
import useBoards from 'src/store/data/boards'
import useDialog from 'src/store/dialog'
import useStore from 'src/store/data/hooks'
import makeBoardActive from 'src/services/board/make-board-active'

const SelectedBoard = () => {
    const currentBoard = useCurrentBoard()
    const boards = useStore(useBoards, (state) => state.boards)

    if (!currentBoard && !!boards) {
        const boardKeys = Object.keys(boards)

        if (boardKeys.length > 0) {
            // Making the first board active, if no board is active
            makeBoardActive(boardKeys[0])
        }
    }

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
                        currentBoard?.name ?? ('No Available Boards' as string)
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
            {boards && <MobileMenuDialog boards={boards} />}
        </div>
    )
}

export default SelectedBoard
