'use client'

import clsx from 'clsx'
import useSidebar from 'src/store/sidebar'
import { cn } from 'src/utils'

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
    useSensors
} from '@dnd-kit/core'

import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'

function SortableItem({ id }: { id: number }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            className={`p-2 ${isDragging ? 'invisible' : 'bg-red-400'}`}
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            Sortable # {id}
        </div>
    )
}

export default function Home() {
    const [activeId, setActiveId] = useState<number | null>(null)
    const [items, setItems] = useState([1, 2, 3])

    const open = useSidebar((state) => state.open)

    const classes = {
        'md:w-[calc(100vw-261px)]': open,
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (active && over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id as number)
                const newIndex = items.indexOf(over.id as number)

                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    function onDragStart(event: DragStartEvent) {
        const { active } = event

        setActiveId(active.id as number)
    }

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
        >
            <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
            >
                <div
                    className={cn(
                        clsx(classes),
                        `flex justify-center items-center bg-grey-primary dark:bg-very-dark-grey h-full w-full`
                    )}
                >
                    <div className='flex flex-col gap-2'>
                        {items.map((item) => (
                            <SortableItem key={item} id={item} />
                        ))}
                    </div>
                    {/* <BoardInfo /> */}
                </div>
            </SortableContext>
            <DragOverlay>
                {activeId ? <SortableItem id={activeId} /> : null}
            </DragOverlay>
        </DndContext>
    )
}
