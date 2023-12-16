'use client'

import BoardInfo from 'others/board/board-info'
import useSidebar from 'store/sidebar'
import { cn } from 'utils/cn'
import clsx from 'clsx'

export default function Home() {
  const open = useSidebar((state) => state.open)

  const classes = {
    'translate-x-[261px] md:max-w-[calc(100vw-261px)]': open,
    'w-full': !open,
  }

  return (
    <div
      className={cn(
        clsx(classes),
        `flex justify-center items-start flex-1 bg-grey-primary dark:bg-very-dark-grey transition ease-in-out duration-700 fixed h-full`
      )}
    >
      <BoardInfo />
    </div>
  )
}
