'use client'

import HideSidebarIcon from 'assets/svg-icons/HideSidebarIcon'
import Typography from 'custom/typography'

const SidebarToggler = () => {
  return (
    <div className='mr-6 px-6 flex items-center py-[14px] gap-3 rounded-r-full transition text-grey-ternary hover:text-purple-primary hover:bg-[#EFEFF9] dark:hover:bg-white cursor-pointer'>
      <HideSidebarIcon />
      <Typography text='Hide Sidebar' size='medium' variant='heading' />
    </div>
  )
}

export default SidebarToggler
