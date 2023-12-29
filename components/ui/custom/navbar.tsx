import AddTaskDialog from 'custom/dialog/add-task-dialog'
import VerticalEllipsisIcon from 'images/icon-vertical-ellipsis.svg'
import Logo from 'images/logo-mobile.svg'
import Image from 'next/image'
import SelectedBoard from 'others/board/selected-board'
import AddTaskButton from 'others/tasks/add-task-button'

// 72 px height mobile
const Navbar = () => {
    return (
        <div className='py-5 bg-white dark:bg-dark-grey flex justify-between items-center px-6'>
            <div className='flex justify-between items-center gap-4'>
                <Image src={Logo} alt='Logo' height={25} width={25} />
                <SelectedBoard />
            </div>
            <div className='flex justify-between items-center gap-4'>
                <AddTaskButton />
                <Image
                    src={VerticalEllipsisIcon}
                    alt='Vertical Ellipsis Icon'
                    height={4}
                    width={4}
                />
                <AddTaskDialog />
            </div>
        </div>
    )
}

export default Navbar
