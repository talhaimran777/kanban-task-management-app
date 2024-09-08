'use client'

import React from 'react'
import { useDrag } from 'react-dnd'
import Typography from 'src/components/ui/custom/typography'
import useTasks from 'src/store/data/tasks'
import useDialog from 'src/store/dialog'
import { Task } from 'src/types/mock'
import { ItemTypes } from 'src/utils'

const ColumnTask = ({ task }: { task: Task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.TASK,
        item: task,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

    const { setType, setOpen } = useDialog()
    const { setTaskToView } = useTasks()

    return (
        <div
            ref={drag}
            className='flex flex-col gap-2 bg-white dark:bg-dark-grey py-6 px-4 rounded-md shadow-md cursor-pointer'
            onClick={() => {
                setOpen(true)
                setType('view-task-dialog')
                setTaskToView(task)
            }}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <Typography text={task.title} size='medium' variant='heading' />
            {/* TODO: Rather than show description, we need to show the count of the completed subtasks */}
            {/* For Example: 0 of 1 substasks */}
            <Typography
                text={task.description}
                size='medium'
                variant='body'
                className='text-grey-ternary text-justify'
            />
        </div>
    )
}

export default ColumnTask
