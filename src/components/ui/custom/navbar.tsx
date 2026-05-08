'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import VerticalEllipsisIcon from 'images/icon-vertical-ellipsis.svg'
import Logo from 'images/logo-mobile.svg'
import Image from 'next/image'
import SelectedBoard from 'src/components/others/board/selected-board'
import AddTaskButton from 'src/components/others/tasks/add-task-button'
import useDialog from 'src/store/dialog'
import useCurrentBoard from 'src/services/board/get-current-board'

// 80 px height mobile
const Navbar = () => {
    const { open, setOpen, setType } = useDialog()
    const currentBoard = useCurrentBoard()

    return (
        <div className='py-5 bg-white dark:bg-dark-grey flex justify-between items-center px-6'>
            <div className='flex justify-between items-center gap-4'>
                <Image src={Logo} alt='Logo' height={25} width={25} />
                <SelectedBoard />
            </div>
            <div className='flex justify-between items-center gap-4'>
                <AddTaskButton />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type='button'
                            className='p-1 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-purple-primary cursor-pointer'
                            aria-label='Board menu'
                        >
                            <Image
                                src={VerticalEllipsisIcon}
                                alt=''
                                height={4}
                                width={4}
                            />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuItem
                            disabled={!currentBoard}
                            onClick={() => {
                                setOpen(true)
                                setType('edit-board-dialog')
                            }}
                        >
                            Edit Board
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={!currentBoard}
                            onClick={() => {
                                setOpen(true)
                                setType('delete-board-dialog')
                            }}
                            className='text-red-primary'
                        >
                            Delete Board
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => {
                                setOpen(true)
                                setType('github-sync-dialog')
                            }}
                        >
                            GitHub sync
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar
