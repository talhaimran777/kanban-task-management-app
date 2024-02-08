'use client'

import { SignOutButton } from '@clerk/nextjs'
import Logo from 'images/logo-mobile.svg'
import Image from 'next/image'
import SelectedBoard from 'src/components/others/board/selected-board'
import AddTaskButton from 'src/components/others/tasks/add-task-button'
import Button from 'src/components/ui/custom/button'

// 72 px height mobile
const Navbar = () => {
    return (
        <div className='py-5 bg-white dark:bg-dark-grey flex justify-between items-center px-6'>
            <div className='flex justify-between items-center gap-4'>
                <Image src={Logo} alt='Logo' height={25} width={25} />
                <SelectedBoard />
            </div>
            <div className='flex justify-between items-center gap-3'>
                <div className='flex justify-between items-center gap-4'>
                    <AddTaskButton />
                </div>
                <SignOutButton>
                    <Button
                        type='button'
                        variant='primary'
                        size='small'
                        text='Sign Out'
                    />
                </SignOutButton>
            </div>
        </div>
    )
}

export default Navbar
