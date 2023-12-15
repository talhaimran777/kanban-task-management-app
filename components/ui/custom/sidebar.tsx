'use client'

import BoardList from 'custom/board-list'
import useData from 'store/data'
import CreateBoardMenuItem from 'custom/create-board-menu-item'
import ThemeToggler from 'custom/theme-toggler'
import SidebarToggler from 'custom/sidebar-toggler'

const Sidebar = () => {
  const { boards } = useData((state) => state.data)

  return (
    <div className='md:flex-col hidden md:flex min-w-[261px] bg-white dark:bg-dark-grey pb-6'>
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
