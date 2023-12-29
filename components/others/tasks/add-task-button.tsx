'use client'

import React from 'react'
import AddTaskIcon from 'images/icon-add-task-mobile.svg'
import Image from 'next/image'
import useDialog from 'store/dialog'

const AddTaskButton = () => {
    const { setOpen, setType } = useDialog()

    return (
        <div
            onClick={() => {
                setOpen(true)
                setType('add-task-dialog')
            }}
            className='bg-purple-secondary py-[10px] px-[18px] rounded-full cursor-pointer'
        >
            <Image
                src={AddTaskIcon}
                alt='Add Task Icon'
                height={12}
                width={12}
            />
        </div>
    )
}

export default AddTaskButton
