import { useState } from 'react'
import BoardColumn from 'src/components/others/board/board-column'
import ColumnCreator from 'src/components/others/board/column-creator'
import { Column, Task } from 'src/types/mock'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import {
    closestCenter,
    DndContext,
    DragEndEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core'

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useStore } from 'src/store/data/hooks'
import useSortableData from 'src/store/data/sortable'
import { SortableTask } from '../tasks/column-tasks'

const SortableColumn = ({ id, column }: { id: string; column: Column }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: id,
        data: {
            type: 'column',
            column,
        },
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <BoardColumn column={column} />
        </div>
    )
}

const BoardColumns = ({ columns }: { columns: Column[] }) => {
    const [columnsIds, setColumnsIds] = useState<string[]>(
        columns.map((column) => column.id)
    )
    const [activeId, setActiveId] = useState<string | null>(null)

    const setActiveTask = useSortableData().setActiveTask
    const setTasks = useSortableData().setTasks

    const activeTask = useStore(useSortableData, (store) => store.activeTask)
    const tasks = useStore(useSortableData, (store) => store.tasks)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (!over || !active || active.id === over.id) {
            return
        }

        const oldIndex = tasks.findIndex((task) => task.id === active.id)
        const newIndex = tasks.findIndex((task) => task.id === over.id)

        setTasks(arrayMove(tasks, oldIndex, newIndex))
    }

    const onDragStart = (event: DragStartEvent) => {
        if (event.active.data.current?.type === 'column') {
            console.log('YOYO, set active column')
            return
        }

        if (event.active.data.current?.type === 'task') {
            console.log('YOYO, set active task', event)
            setActiveTask(event.active.data.current.task as Task)
            return
        }
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <SortableContext
                items={columnsIds}
                strategy={verticalListSortingStrategy}
            >
                <div className='flex gap-6 max-h-[calc(100vh-72px)] h-full w-full px-6 overflow-auto'>
                    {columnsIds.map((columnId, index) => (
                        <SortableColumn
                            id={columnId}
                            column={
                                columns.find(
                                    (col) => col.id === columnId
                                ) as Column
                            }
                            key={index}
                        />
                    ))}
                    <ColumnCreator />
                </div>
            </SortableContext>
            <DragOverlay>
                {activeId ? (
                    <SortableColumn
                        id={activeId}
                        column={
                            columns.find(
                                (column) => column.id === activeId
                            ) as Column
                        }
                    />
                ) : null}

                {activeTask ? (
                    <SortableTask id={activeTask.id} task={activeTask} />
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

export default BoardColumns
