'use client'

import BoardList from 'src/components/ui/custom/board-list'
import CreateBoardMenuItem from 'src/components/ui/custom/create-board-menu-item'
import ThemeToggler from 'src/components/ui/custom/theme-toggler'
import SidebarToggler from 'src/components/ui/custom/sidebar-toggler'
import useSidebar from 'src/store/sidebar'
import { cn } from 'src/utils/cn'
import clsx from 'clsx'
import useBoards from 'src/store/data/boards'

const Sidebar = () => {
    // const { boards } = useData((state) => state.data)
    const boards = useBoards((state) => state.boards)
    const open = useSidebar((state) => state.open)

    const classes = {
        'w-0 hidden': !open,
        'md:flex-col hidden md:flex min-w-[261px] bg-white dark:bg-dark-grey pb-6':
            open,
    }

    return (
        <div className={cn(clsx(classes))}>
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
