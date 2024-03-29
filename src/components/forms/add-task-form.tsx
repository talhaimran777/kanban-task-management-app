'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import CrossIcon from 'src/assets/svg-icons/CrossIcon'
import Button from 'src/components/ui/custom/button'
import FormInputGroup from 'src/components/ui/custom/form/form-input-group'
import Typography from 'src/components/ui/custom/typography'
import { useFieldArray, useForm } from 'react-hook-form'
import taskFormSchema from 'src/schema/task-form-schema'
import useCurrentBoard from 'src/services/board/get-current-board'
import getColumnsByBoardId from 'src/services/column/get-columns-by-board-id'
import addTaskService from 'src/services/task/add-task-service'
import { createTaskService } from 'src/services/task/create-task-service'
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
import { z } from 'zod'
import useSubTask from 'src/store/data/subtasks'
import useDialog from 'src/store/dialog'

const AddTaskForm = () => {
    const { setOpen, setType } = useDialog()

    const form = useForm<z.infer<typeof taskFormSchema>>({
        resolver: zodResolver(taskFormSchema),
        defaultValues: {
            title: '',
            description: '',
            subtasks: [],
            status: '',
        },
    })

    const {
        fields: subtaskFields,
        append,
        remove,
    } = useFieldArray({
        control: form.control,
        name: 'subtasks',
    })

    const selectedBoard = useCurrentBoard()
    const columns = getColumnsByBoardId(selectedBoard?.id as string)

    function onSubmit(values: z.infer<typeof taskFormSchema>) {
        if (values) {
            const [task, subtasks] = createTaskService({ values })

            // Add newly created task to the board
            addTaskService({ task })

            // TODO: Extract this to a service
            subtasks.forEach((subtask) => {
                const { subtasks, setSubtasks } = useSubTask.getState()

                setSubtasks({ ...subtasks, [subtask.id]: subtask })
            })

            setOpen(false)
            setType('')
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-6 mt-2'
            >
                <FormInputGroup
                    name='title'
                    label='Title'
                    placeholder='e.g. Take coffee break'
                    control={form.control}
                />

                <FormInputGroup
                    name='description'
                    label='Description'
                    placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.'
                    control={form.control}
                />

                <FormLabel className='-mb-4'>
                    <Typography
                        text='Subtasks'
                        variant='heading'
                        size='small'
                    />
                </FormLabel>

                {subtaskFields.map((_field, index) => (
                    <div
                        className='flex justify-between items-center gap-4'
                        key={index}
                    >
                        <FormInputGroup
                            name={`subtasks.${index}.name`}
                            label='Subtask'
                            placeholder='e.g. This is a subtask'
                            control={form.control}
                            hideLabel={true}
                        />
                        <button type='button' onClick={() => remove(index)}>
                            <CrossIcon className='cursor-pointer' />
                        </button>
                    </div>
                ))}

                <Button
                    type='button'
                    variant='secondary'
                    size='small'
                    fluid={true}
                    text='Add New Subtask'
                    onClick={() => append({ name: '' })}
                />

                {/* TODO */}
                {/* Create a common component for this FormField */}
                <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                <Typography
                                    text='Status'
                                    variant='heading'
                                    size='small'
                                />
                            </FormLabel>
                            <Select
                                onValueChange={(value) => {
                                    field.onChange(value)
                                }}
                                defaultValue={field.value}
                            >
                                <FormControl className='dark:bg-dark-grey dark:border-grey-ternary dark:focus-visible:ring-purple-primary dark:focus:ring-purple-primary focus-visible:ring-purple-primary focus-visible:ring-offset-0 focus-visible:ring-2'>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Select status' />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='dark:bg-dark-grey'>
                                    {columns.map((col) => (
                                        <SelectItem key={col.id} value={col.id}>
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
                    text='Create a New Task'
                />
            </form>
        </Form>
    )
}

export default AddTaskForm
