'use client'

import { LegacyRef } from 'react'
import { useDrag } from 'react-dnd'
import Typography from 'src/components/ui/custom/typography'
import useSubTask from 'src/store/data/subtasks'
import useTasks from 'src/store/data/tasks'
import useDialog from 'src/store/dialog'
import { Subtask, Task } from 'src/types/mock'
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
    const { subtasks } = useSubTask()

    // TODO: Extract this into a service, it should receive task id and return subtasks
    const totalSubtasks = Object.values(subtasks).filter(
        (subtask: Subtask) => subtask.taskId === task.id
    )

    // TODO: Extract this into a service
    const completedSubtasksCount = totalSubtasks.filter(
        (subtask: Subtask) => subtask.isCompleted
    ).length

    return (
        <div
            ref={drag as unknown as LegacyRef<HTMLDivElement>}
            className={`flex flex-col gap-2 bg-white dark:bg-dark-grey py-6 px-4 rounded-md shadow-md cursor-pointer ${isDragging ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => {
                setOpen(true)
                setType('view-task-dialog')
                setTaskToView(task)
            }}
        >
            <Typography text={task.title} size='medium' variant='heading' />
            <Typography
                text={`${completedSubtasksCount} of ${totalSubtasks.length} subtasks`}
                size='medium'
                variant='body'
                className='text-grey-ternary text-justify'
            />
        </div>
    )
}

export default ColumnTask
