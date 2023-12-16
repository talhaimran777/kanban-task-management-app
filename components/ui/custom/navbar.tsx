import AddTaskDialog from 'custom/dialog/add-task-dialog'
import AddTaskIcon from 'images/icon-add-task-mobile.svg'
import VerticalEllipsisIcon from 'images/icon-vertical-ellipsis.svg'
import Logo from 'images/logo-mobile.svg'
import Container from 'layout/contianer'
import Image from 'next/image'
import SelectedBoard from 'others/board/selected-board'
import { DialogTrigger } from 'ui/dialog'

// 72 px height mobile
const Navbar = () => {
  return (
    <div className='py-5 bg-white dark:bg-dark-grey flex justify-between items-center px-6'>
      <div className='flex justify-between items-center gap-4'>
        <Image src={Logo} alt='Logo' height={25} width={25} />
        <SelectedBoard />
      </div>
      <div className='flex justify-between items-center gap-4'>
        <AddTaskDialog
          trigger={
            <DialogTrigger>
              <div className='bg-purple-secondary py-[10px] px-[18px] rounded-full'>
                <Image
                  src={AddTaskIcon}
                  alt='Add Task Icon'
                  height={12}
                  width={12}
                />
              </div>
            </DialogTrigger>
          }
        />
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
