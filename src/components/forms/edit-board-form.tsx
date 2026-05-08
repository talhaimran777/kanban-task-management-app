'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import CrossIcon from 'src/assets/svg-icons/CrossIcon'
import Button from 'src/components/ui/custom/button'
import FormInputGroup from 'src/components/ui/custom/form/form-input-group'
import { Form } from 'src/components/ui/form'
import boardFormSchema from 'src/schema/board-form-schema'
import { updateBoardName } from 'src/lib/domain/boards'
import {
    addColumn,
    createColumnForBoard,
    deleteColumnsByIds,
    putColumn,
} from 'src/lib/domain/columns'
import { moveTasksOffRemovedColumns } from 'src/lib/domain/tasks'
import useDialog from 'src/store/dialog'
import { Board, Column } from 'src/types/mock'
import { z } from 'zod'

const EditBoardForm = ({
    board,
    columns,
}: {
    board: Board
    columns: Column[]
}) => {
    const { setOpen, setType } = useDialog()
    const form = useForm<z.infer<typeof boardFormSchema>>({
        resolver: zodResolver(boardFormSchema),
        defaultValues: {
            name: board.name,
            columns,
        },
    })

    const {
        fields: columnsFields,
        append,
        remove,
    } = useFieldArray({
        control: form.control,
        name: 'columns',
    })

    const onSubmit = async (values: z.infer<typeof boardFormSchema>) => {
        try {
            updateBoardName(board.id, values.name)

            const submitted = values.columns ?? []
            const resolvedColumns: Column[] = submitted.map((col) => {
                if (col.id) {
                    const prev = columns.find((c) => c.id === col.id)
                    if (!prev) {
                        return createColumnForBoard(col.name, board.id)
                    }
                    return { ...prev, name: col.name, boardId: board.id }
                }
                return createColumnForBoard(col.name, board.id)
            })

            const submittedIds = new Set(resolvedColumns.map((c) => c.id))
            const removedIds = columns
                .map((c) => c.id)
                .filter((id) => id && !submittedIds.has(id))

            if (removedIds.length && resolvedColumns.length) {
                moveTasksOffRemovedColumns(removedIds, resolvedColumns[0].id)
            }

            if (removedIds.length) {
                deleteColumnsByIds(removedIds)
            }

            const initialIds = new Set(columns.map((c) => c.id))
            for (const column of resolvedColumns) {
                if (initialIds.has(column.id)) {
                    putColumn(column)
                } else {
                    addColumn(column)
                }
            }

            setOpen(false)
            setType('')
        } catch (error: unknown) {
            console.log(JSON.stringify(error))
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col gap-6 mt-2'
            >
                <FormInputGroup
                    name='name'
                    label='Board Name'
                    placeholder='e.g. Web Design'
                    control={form.control}
                />

                {columnsFields.map((field, index) => (
                    <div
                        className='flex justify-between items-center gap-4'
                        key={field.id}
                    >
                        <FormInputGroup
                            name={`columns.${index}.name`}
                            label='Column Name'
                            placeholder='e.g. Todo'
                            control={form.control}
                            hideLabel={true}
                        />
                        <button
                            type='button'
                            onClick={() => remove(index)}
                            className=' focus-visible:ring-purple-primary focus-visible:ring-2 p-1'
                        >
                            <CrossIcon className='cursor-pointer' />
                        </button>
                    </div>
                ))}

                <Button
                    type='button'
                    variant='secondary'
                    size='small'
                    fluid={true}
                    text='+ Add New Column'
                    onClick={() => append({ id: '', name: '' })}
                />

                <Button
                    type='submit'
                    variant='primary'
                    size='small'
                    fluid={true}
                    text='Save Changes'
                />
            </form>
        </Form>
    )
}

export default EditBoardForm
