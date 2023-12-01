import Image from 'next/image'
import Logo from 'images/logo-mobile.svg'
import AddTaskIcon from 'images/icon-add-task-mobile.svg'
import VerticalEllipsisIcon from 'images/icon-vertical-ellipsis.svg'
import ChevronDownIcon from 'images/icon-chevron-down.svg'

// 72 px height mobile
const Navbar = () => {
  return (
    <div className='py-5 px-4 bg-white flex justify-between items-center'>
      <div className='flex justify-between items-center gap-4'>
        <Image src={Logo} alt='Logo' height={25} width={25} />
        <div className='flex justify-between items-center gap-2'>
          <p className='text-lg font-bold leading-6 text-black-primary'>
            Platform Launch
          </p>
          <Image
            src={ChevronDownIcon}
            alt='ChevronDownIcon'
            height={12}
            width={12}
          />
        </div>
      </div>
      <div className='flex justify-between items-center gap-4'>
        <div className='bg-purple-secondary py-[10px] px-[18px] rounded-full'>
          <Image src={AddTaskIcon} alt='Add Task Icon' height={12} width={12} />
        </div>
        <Image
          src={VerticalEllipsisIcon}
          alt='Vertical Ellipsis Icon'
          height={4}
          width={4}
        />
      </div>
    </div>
  )
}

export default Navbar
