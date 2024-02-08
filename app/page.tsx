'use client'

import clsx from 'clsx'
import BoardInfo from 'src/components/others/board/board-info'
import Dialogs from 'src/components/ui/custom/dialog'
import Navbar from 'src/components/ui/custom/navbar'
import ShowSidebar from 'src/components/ui/custom/show-sidebar'
import Sidebar from 'src/components/ui/custom/sidebar'
import useSidebar from 'src/store/sidebar'
import { cn } from 'src/utils/cn'

export default function Home() {
    const open = useSidebar((state) => state.open)

    const classes = {
        'md:w-[calc(100vw-261px)]': open,
    }

    return (
        <div className='flex flex-col h-screen dark:bg-very-dark-grey'>
            <Navbar />
            <div className='flex justify-between flex-1'>
                <Sidebar />
                <div
                    className={cn(
                        clsx(classes),
                        `flex justify-center items-center bg-grey-primary dark:bg-very-dark-grey h-full w-full`
                    )}
                >
                    <BoardInfo />
                </div>
                <ShowSidebar />
                <Dialogs />
            </div>
        </div>
    )
}
