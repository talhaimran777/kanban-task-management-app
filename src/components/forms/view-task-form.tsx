'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { Checkbox } from 'src/components/ui/checkbox'
import Button from 'src/components/ui/custom/button'
import FormInputGroup from 'src/components/ui/custom/form/form-input-group'
import TaskImages from 'src/components/ui/custom/form/task-images'
import Typography from 'src/components/ui/custom/typography'
import { Form, FormControl, FormField, FormLabel } from 'src/components/ui/form'
import viewTaskFormSchema from 'src/schema/view-task-form-schema'
import useCurrentBoard from 'src/services/board/get-current-board'
import getColumnsByBoardId from 'src/services/column/get-columns-by-board-id'
import { useStore } from 'src/store/data/hooks'
import useSubTask from 'src/store/data/subtasks'
import useTasks from 'src/store/data/tasks'
import useDialog from 'src/store/dialog'
import { Subtask, Task } from 'src/types/mock'
import { z } from 'zod'

// TODO: This form is rendering twice, fix it
const ViewTaskForm = () => {
    const { setOpen, setType } = useDialog()
    const task = useStore(useTasks, (state) => state.taskToView)

    // INFO: we will wrap useSubTask with useStore, as we are trying to get the subtasks
    const subtasks = useStore(useSubTask, (state) => state.subtasks)

    const setTask = useTasks((state) => state.setTask)
    const setSubtask = useSubTask((state) => state.setSubtask)

    // TODO: Populate the form with the task data here
    const form = useForm<z.infer<typeof viewTaskFormSchema>>({
        resolver: zodResolver(viewTaskFormSchema),
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

    function onSubmit(values: z.infer<typeof viewTaskFormSchema>) {
        if (values) {
            // TODO: Extract this into a service
            if (!values.id) {
                return
            }

            const taskToBeUpdated: Task = task

            taskToBeUpdated.columnId = values.status as string

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

    // TODO: Convert this to populate subtasks only
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

            console.log('Setting task status', task.columnId)

            form.setValue('status', task.columnId)

            // TODO: Extract this into a service, it should receive task id and return subtasks
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
        <div className='flex flex-col gap-6'>
            <Typography
                text={task?.description ?? ''}
                size='medium'
                variant='body'
                className='text-grey-ternary text-justify'
            />

            <TaskImages images={task?.images ?? []} />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className='flex flex-col gap-6'
                >
                    {!!fields?.length && (
                        <div>
                            <Typography
                                text='Subtasks'
                                variant='heading'
                                size='small'
                                className='text-black dark:text-white mb-2'
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

                    <FormInputGroup
                        name='status'
                        label='Status'
                        control={form.control}
                        disabled={true}
                        value={
                            columns.find((col) => col.id === task?.columnId)
                                ?.name ?? ''
                        }
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
