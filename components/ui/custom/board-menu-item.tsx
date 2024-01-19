'use client'

import BoardIcon from 'assets/svg-icons/BoardIcon'
import clsx from 'clsx'
import MenuItem from 'custom/menu-item'
import Typography from 'custom/typography'
import makeBoardActive from 'services/board/make-board-active'
import useActiveBoard from 'store/data/active-board'
import useDialog from 'store/dialog'
import { Board } from 'types/mock/v2'

const BoardMenuItem = ({ board }: { board: Board }) => {
    const activeBoardId = useActiveBoard((state) => state.activeBoardId)
    const { setType, setOpen } = useDialog()

    const getStyles = (isActive: boolean | undefined) => {
        const colors = {
            'bg-purple-primary text-white': !!isActive,
            'hover:bg-[#EFEFF9] dark:hover:bg-white hover:text-purple-primary text-grey-ternary cursor-pointer':
                !isActive,
        }

        const common = {
            'mr-6 px-6 flex items-center py-[14px] gap-3 rounded-r-full transition':
                true,
        }

        return { ...colors, ...common }
    }

    return (
        <div
            className={clsx(getStyles(board.id === activeBoardId))}
            onClick={() => {
                makeBoardActive(board.id as string)
                setType('')
                setOpen(false)
            }}
        >
            <MenuItem
                icon={<BoardIcon />}
                typography={
                    <Typography
                        text={board?.name}
                        variant='heading'
                        size='medium'
                    />
                }
            />
        </div>
    )
}

export default BoardMenuItem
