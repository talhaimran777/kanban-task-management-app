'use client'

import clsx from 'clsx'
import { useEffect } from 'react'
import BoardsList from 'src/components/ui/custom/board-list'
import CreateBoardMenuItem from 'src/components/ui/custom/create-board-menu-item'
import SidebarToggler from 'src/components/ui/custom/sidebar-toggler'
import ThemeToggler from 'src/components/ui/custom/theme-toggler'
import useBoards from 'src/store/data/boards'
import { useStore, useWindowSize } from 'src/store/data/hooks'
import useBound from 'src/store/data/hydrated'
import useSidebar from 'src/store/sidebar'
import { cn } from 'src/utils/cn'
import { Skeleton } from '../skeleton'

const Sidebar = () => {
    const boards = useStore(useBoards, (state) => state.boards)
    const hydrated = useStore(useBound, (state) => state.hydrated)
    const { open, setOpen } = useSidebar()

    const { width } = useWindowSize()

    const classes = {
        'w-0 hidden': !open,
        'md:flex-col hidden md:flex min-w-[261px] bg-white dark:bg-dark-grey pb-6':
            open,
    }

    useEffect(() => {
        if (width < 768) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [width, setOpen])

    return (
        <div className={cn(clsx(classes))}>
            <div className='flex-1'>
                {hydrated ? (
                    <BoardsList boards={boards} />
                ) : (
                    <div className='flex flex-col gap-2 w-full'>
                        {[...Array(3)].map((_, index) => (
                            <Skeleton
                                key={index}
                                className='h-12 mr-6 rounded-r-full'
                            />
                        ))}
                    </div>
                )}
                <CreateBoardMenuItem />
            </div>
            <ThemeToggler />
            <SidebarToggler />
        </div>
    )
}

export default Sidebar
