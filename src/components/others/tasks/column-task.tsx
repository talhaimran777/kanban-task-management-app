import React from 'react'
import Typography from 'src/components/ui/custom/typography'
import { Task } from 'src/types/mock'

const ColumnTask = ({ task }: { task: Task }) => {
    return (
        <div className='flex flex-col gap-2 bg-white dark:bg-dark-grey py-6 px-4 rounded-md shadow-md'>
            <Typography text={task.title} size='medium' variant='heading' />
            {/* TODO: Rather than show description, we need to show the count of the completed subtasks */}
            {/* For Example: 0 of 1 substasks */}
            <Typography
                text={task.description}
                size='medium'
                variant='body'
                className='text-grey-ternary'
            />
        </div>
    )
}

export default ColumnTask
