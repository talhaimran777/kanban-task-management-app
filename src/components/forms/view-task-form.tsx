'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import Button from 'src/components/ui/custom/button'
import Typography from 'src/components/ui/custom/typography'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'src/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/components/ui/select'
import taskFormSchema from 'src/schema/task-form-schema'
import useCurrentBoard from 'src/services/board/get-current-board'
import getColumnsByBoardId from 'src/services/column/get-columns-by-board-id'
import { useStore } from 'src/store/data/hooks'
import useSubTask from 'src/store/data/subtasks'
import useTasks from 'src/store/data/tasks'
import useDialog from 'src/store/dialog'
import { Column, Subtask, Task } from 'src/types/mock'
import { z } from 'zod'
import { Checkbox } from '../ui/checkbox'

// TODO: This form is rendering twice, fix it
const ViewTaskForm = () => {
    const { setOpen, setType } = useDialog()
    const task = useStore(useTasks, (state) => state.taskToView)
    // INFO: we are not wrapping useTasks with useStore, as setTask is a setter function.
    // we only wrap useStore when we are getting the store data.
    const tasks = useStore(useTasks, (state) => state.tasks)
    const subtasks = useStore(useSubTask, (state) => state.subtasks)

    const setTask = useTasks((state) => state.setTask)
    const setSubtask = useSubTask((state) => state.setSubtask)

    const form = useForm<z.infer<typeof taskFormSchema>>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: '',
            description: '',
            subtasks: [],
            status: '',
        },
    })

    const { fields, append } = useFieldArray({
        control: form.control,
        name: 'subtasks',
    })

    const selectedBoard = useCurrentBoard()
    const columns = getColumnsByBoardId(selectedBoard?.id as string)

    function onSubmit(values: z.infer<typeof taskFormSchema>) {
        if (values) {
            // TODO: Extract this into a service
            if (!values.id) {
                return
            }

            const taskToBeUpdated: Task = tasks[values.id]

            taskToBeUpdated.columnId = values.status

            setTask(taskToBeUpdated, values.id)

            values.subtasks?.forEach((subtask) => {
                if (subtask.id) {
                    const subtaskToBeUpdated: Subtask = subtasks[subtask.id]
                    subtaskToBeUpdated.isCompleted = Boolean(
                        subtask.isCompleted
                    )

                    setSubtask(subtaskToBeUpdated, subtask.id)
                }
            })

            setOpen(false)
            setType('')
        }
    }

    const populateTask = useCallback(
        (task: Task) => {
            const populateSubtasks = (subtasks: Subtask[]) => {
                subtasks.forEach((subtask: Subtask) => {
                    append({
                        id: subtask.id,
                        name: subtask.title,
                        isCompleted: subtask.isCompleted,
                    })
                })
            }

            form.setValue('id', task.id)
            form.setValue('title', task.title)
            form.setValue('description', task.description)

            const taskColumn: Column | undefined = columns.find(
                (col) => col.id === task.columnId
            )

            if (taskColumn) {
                form.setValue('status', taskColumn.id)
            }

            const taskSubtasks = Object.values(subtasks).filter(
                (subtask: Subtask) => subtask.taskId === task.id
            )

            populateSubtasks(taskSubtasks)
        },
        [columns, form, append, subtasks]
    )

    useEffect(() => {
        if (!task) {
            return
        }

        populateTask(task)
    }, [task])

    return (
        <div>
            <Typography
                text={task?.description ?? ''}
                size='medium'
                variant='body'
                className='text-grey-ternary text-justify'
            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='mt-4 flex flex-col gap-6'
                >
                    {!!fields?.length && (
                        <div>
                            <Typography
                                text='Subtasks'
                                variant='heading'
                                size='small'
                                className='text-black dark:text-white mb-4'
                            />

                            <div className='flex flex-col gap-2'>
                                {fields.map((_field, index) => (
                                    <FormField
                                        key={index}
                                        control={form.control}
                                        name={`subtasks.${index}.isCompleted`}
                                        render={({ field }) => (
                                            // TODO: Create a common component for this
                                            <div className='items-top flex items-center space-x-4 p-3 bg-grey-primary dark:bg-very-dark-grey rounded-md dark:hover:bg-purple-ternary-dark hover:bg-purple-ternary'>
                                                <FormControl>
                                                    <Checkbox
                                                        id={`subtasks.${index}.isCompleted`}
                                                        checked={field.value}
                                                        onCheckedChange={
                                                            field.onChange
                                                        }
                                                    />
                                                </FormControl>
                                                <div className='grid gap-1.5 leading-none'>
                                                    <FormLabel
                                                        htmlFor={`subtasks.${index}.name`}
                                                        className='peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                                    >
                                                        <Typography
                                                            text={
                                                                fields[index]
                                                                    .name
                                                            }
                                                            variant='heading'
                                                            size='small'
                                                            className='text-black dark:text-white'
                                                        />
                                                    </FormLabel>
                                                </div>
                                            </div>
                                        )}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TODO */}
                    {/* Create a common component for this FormField */}
                    <FormField
                        control={form.control}
                        name='status'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    <Typography
                                        text='Current Status'
                                        variant='heading'
                                        size='small'
                                        className='text-black dark:text-white'
                                    />
                                </FormLabel>
                                <Select
                                    onValueChange={(value) => {
                                        field.onChange(value)
                                    }}
                                    defaultValue={field.value}
                                    value={field.value}
                                >
                                    <FormControl className='dark:bg-dark-grey dark:border-grey-ternary dark:focus-visible:ring-purple-primary dark:focus:ring-purple-primary focus-visible:ring-purple-primary focus-visible:ring-offset-0 focus-visible:ring-2'>
                                        <SelectTrigger autoFocus={false}>
                                            <SelectValue placeholder='Select status' />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className='dark:bg-dark-grey'>
                                        {columns.map((col) => (
                                            <SelectItem
                                                key={col.id}
                                                value={col.id}
                                            >
                                                {col.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type='submit'
                        variant='primary'
                        size='small'
                        fluid={true}
                        text='Update Task'
                    />
                </form>
            </Form>
        </div>
    )
}

export default ViewTaskForm
