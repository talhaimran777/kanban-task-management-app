import { Board } from 'types/mock'
import clsx from 'clsx'
import BoardIcon from 'assets/svg-icons/BoardIcon'
import MenuItem from 'custom/menu-item'
import Typography from 'custom/typography'

const BoardMenuItem = ({ board }: { board: Board }) => {
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
    <div className={clsx(getStyles(board.isActive))}>
      <MenuItem
        icon={<BoardIcon />}
        typography={
          <Typography text={board?.name} variant='heading' size='medium' />
        }
      />
    </div>
  )
}

export default BoardMenuItem
