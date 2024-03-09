'use client'

import ChevronDownIcon from 'images/icon-chevron-down.svg'
import Image from 'next/image'
import MobileMenuDialog from 'src/components/ui/custom/dialog/mobile-menu-dialog'
import Typography from 'src/components/ui/custom/typography'
import { Skeleton } from 'src/components/ui/skeleton'
import useCurrentBoard from 'src/services/board/get-current-board'
import makeBoardActive from 'src/services/board/make-board-active'
import useBoards from 'src/store/data/boards'
import { useStore, useWindowSize } from 'src/store/data/hooks'
import useBound from 'src/store/data/hydrated'
import useDialog from 'src/store/dialog'

const SelectedBoard = () => {
    const currentBoard = useCurrentBoard()
    const boards = useStore(useBoards, (state) => state.boards)
    const hydrated = useStore(useBound, (state) => state.hydrated)
    const { width } = useWindowSize()

    // CONSTANTS
    const showMobileMenu = width < 768

    if (!currentBoard && !!boards) {
        const boardKeys = Object.keys(boards)

        if (boardKeys.length > 0) {
            // Making the first board active, if no board is active
            makeBoardActive(boardKeys[0])
        }
    }

    const { type, setOpen, setType } = useDialog()

    return (
        <div>
            {hydrated ? (
                <div
                    className={`flex justify-between items-center gap-2 ${showMobileMenu ? 'cursor-pointer' : ''}`}
                    onClick={() => {
                        if (type === 'mobile-menu-dialog') {
                            return;
                        }

                        if (showMobileMenu) {
                            setOpen(true)
                            setType('mobile-menu-dialog')
                        }
                    }}
                >
                    <Typography
                        text={
                            currentBoard?.name ??
                            ('No Available Boards' as string)
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
                    {showMobileMenu && <MobileMenuDialog boards={boards} />}
                </div>
            ) : (
                <Skeleton className='h-8 w-[190px] dark:bg-grey-ternary rounded-r-full' />
            )}
        </div>
    )
}

export default SelectedBoard
