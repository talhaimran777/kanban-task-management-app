'use client'

import Typography from 'src/components/ui/custom/typography'
import useDialog from 'src/store/dialog'

const ColumnCreator = () => {
    const { setOpen, setType } = useDialog()

    return (
        <div
            onClick={() => {
                setOpen(true)
                setType('edit-board-dialog')
            }}
            className='flex cursor-pointer justify-center items-center min-w-[280px] dark:bg-dark-grey bg-white my-6 shadow-md sticky top-[24px] rounded-md'
        >
            <div>
                <Typography
                    text='+ new column'
                    size='large'
                    variant='heading'
                />
            </div>
        </div>
    )
}

export default ColumnCreator
