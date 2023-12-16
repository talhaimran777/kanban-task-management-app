'use client'

import BoardList from 'custom/board-list'
import useData from 'store/data'
import CreateBoardMenuItem from 'custom/create-board-menu-item'
import ThemeToggler from 'custom/theme-toggler'
import SidebarToggler from 'custom/sidebar-toggler'
import useSidebar from 'store/sidebar'
import { cn } from 'utils/cn'
import clsx from 'clsx'

const Sidebar = () => {
  const { boards } = useData((state) => state.data)
  const open = useSidebar((state) => state.open)

  const classes = {
    '-translate-x-[261px]': !open,
  }

  return (
    <div
      className={cn(
        clsx(classes),
        `md:flex-col hidden md:flex min-w-[261px] bg-white dark:bg-dark-grey pb-6 transition ease-in-out duration-700 fixed h-[calc(100%-72px)]`
      )}
    >
      <div className='flex-1'>
        <BoardList boards={boards} />
        <CreateBoardMenuItem />
      </div>
      <ThemeToggler />
      <SidebarToggler />
    </div>
  )
}

export default Sidebar
