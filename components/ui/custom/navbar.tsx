import Container from 'layout/contianer'
import { DialogTrigger } from 'ui/dialog'
import AddTaskIcon from 'images/icon-add-task-mobile.svg'
import ChevronDownIcon from 'images/icon-chevron-down.svg'
import VerticalEllipsisIcon from 'images/icon-vertical-ellipsis.svg'
import Logo from 'images/logo-mobile.svg'
import Boards from 'mock/data.json'
import Image from 'next/image'
import { Data } from 'types/mock'
import MobileMenuDialog from 'custom/mobile-menu-dialog'

const data = Boards as Data

// 72 px height mobile
const Navbar = () => {
  return (
    <Container>
      <div className='py-5 bg-white dark:bg-dark-grey flex justify-between items-center'>
        <div className='flex justify-between items-center gap-4'>
          <Image src={Logo} alt='Logo' height={25} width={25} />
          <MobileMenuDialog
            trigger={
              <DialogTrigger>
                <div className='flex justify-between items-center gap-2 focus-visible:outline-none'>
                  <p className='text-lg font-bold leading-6'>Platform Launch</p>
                  <Image
                    src={ChevronDownIcon}
                    alt='ChevronDownIcon'
                    height={12}
                    width={12}
                  />
                </div>
              </DialogTrigger>
            }
            boards={data.boards}
          />
        </div>
        <div className='flex justify-between items-center gap-4'>
          <div className='bg-purple-secondary py-[10px] px-[18px] rounded-full'>
            <Image
              src={AddTaskIcon}
              alt='Add Task Icon'
              height={12}
              width={12}
            />
          </div>
          <Image
            src={VerticalEllipsisIcon}
            alt='Vertical Ellipsis Icon'
            height={4}
            width={4}
          />
        </div>
      </div>
    </Container>
  )
}

export default Navbar
