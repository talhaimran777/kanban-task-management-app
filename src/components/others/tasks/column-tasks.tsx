import ColumnTask from 'src/components/others/tasks/column-task'
import { Task } from 'src/types/mock'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useMemo, useState } from 'react'
import { useStore } from 'src/store/data/hooks'
import useSortableData from 'src/store/data/sortable'

export const SortableTask = ({ id, task }: { id: string; task: Task }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: id, data: { type: 'task', task } })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ColumnTask task={task} isDragging={isDragging} />
        </div>
    )
}

const ColumnTasks = ({ tasks: originalTasks }: { tasks: Task[] }) => {
    const tasks = useStore(useSortableData, (store) => store.tasks)
    const setTasks = useSortableData((state) => state.setTasks)

    const tasksIds = useMemo(() => {
        if (!tasks) {
            return []
        }

        return tasks.map((task) => task.id)
    }, [tasks])

    const [activeId, setActiveId] = useState<string | null>(null)

    return (
        <SortableContext
            items={tasksIds}
            strategy={verticalListSortingStrategy}
        >
            {originalTasks &&
                originalTasks.map((task) => (
                    <SortableTask key={task.id} id={task.id} task={task} />
                ))}
        </SortableContext>
    )
}

export default ColumnTasks
