'use client'

import BoardInfo from 'src/components/others/board/board-info'
import useSidebar from 'src/store/sidebar'
import { cn } from 'src/utils/cn'
import clsx from 'clsx'

export default function Home() {
    const open = useSidebar((state) => state.open)

    const classes = {
        'md:w-[calc(100vw-261px)]': open,
    }

    return (
        <div
            className={cn(
                clsx(classes),
                `flex justify-center items-center bg-grey-primary dark:bg-very-dark-grey h-full w-full`
            )}
        >
            <BoardInfo />
        </div>
    )
}
