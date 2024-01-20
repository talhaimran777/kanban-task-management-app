'use client'

import ShowSidebarIcon from 'src/assets/svg-icons/ShowSidebarIcon'
import useSidebar from 'src/store/sidebar'

const ShowSidebar = () => {
    const { open, setOpen } = useSidebar()

    return !open ? (
        <div
            className='hidden fixed bottom-8 left-0 z-10 w-14 h-12 bg-purple-primary rounded-r-full md:flex justify-center items-center cursor-pointer'
            onClick={() => setOpen(!open)}
        >
            <ShowSidebarIcon className='text-white' />
        </div>
    ) : null
}

export default ShowSidebar
