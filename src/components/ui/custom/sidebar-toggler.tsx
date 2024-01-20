'use client'

import HideSidebarIcon from 'src/assets/svg-icons/HideSidebarIcon'
import Typography from 'src/components/ui/custom/typography'
import useSidebar from 'src/store/sidebar'

const SidebarToggler = () => {
    const { open, setOpen } = useSidebar()

    return (
        <div
            className='mr-6 px-6 flex items-center py-[14px] gap-3 rounded-r-full transition text-grey-ternary hover:text-purple-primary hover:bg-[#EFEFF9] dark:hover:bg-white cursor-pointer'
            onClick={() => setOpen(!open)}
        >
            <HideSidebarIcon />
            <Typography text='Hide Sidebar' size='medium' variant='heading' />
        </div>
    )
}

export default SidebarToggler
