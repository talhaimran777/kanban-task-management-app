'use client'

import BoardIcon from 'assets/svg-icons/BoardIcon'
import MenuItem from 'custom/menu-item'
import Typography from 'custom/typography'
import useDialog from 'store/dialog'

const CreateBoardMenuItem = () => {
    const { setOpen, setType } = useDialog()

    return (
        <div
            className='mr-6 px-6 flex items-center py-[14px] gap-3 rounded-r-full transition text-purple-primary hover:bg-[#EFEFF9] dark:hover:bg-white cursor-pointer'
            onClick={() => {
                setOpen(true)
                setType('add-board-dialog')
            }}
        >
            <MenuItem
                icon={<BoardIcon />}
                typography={
                    <Typography
                        text='+ Create New Board'
                        variant='heading'
                        size='medium'
                    />
                }
            />
        </div>
    )
}

export default CreateBoardMenuItem
