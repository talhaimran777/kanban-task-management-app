'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import CrossIcon from 'src/assets/svg-icons/CrossIcon'
import Button from 'src/components/ui/custom/button'
import FormInputGroup from 'src/components/ui/custom/form/form-input-group'
import { Form } from 'src/components/ui/form'
import boardFormSchema from 'src/schema/board-form-schema'
import editBoardService from 'src/services/board/edit-board-service'
import addColumnService from 'src/services/column/add-columns-service'
import createColumnService from 'src/services/column/create-column-service'
import editColumnService from 'src/services/column/edit-columns-service'
import useColumns from 'src/store/data/columns'
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
    const { resetColumns } = useColumns((state) => state)
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
            editBoardService({
                id: board.id,
                name: values.name,
            })

            // TODO: check if any of the columns contains tasks in them.
            resetColumns()

            if (values.columns) {
                // TODO: Extract this to a service
                // TODO: if values.columns length is less than the columns for the current board
                // then delete the extra columns
                values.columns.forEach((column) => {
                    if (column.id) {
                        return editColumnService({
                            id: column.id,
                            name: column.name,
                            boardId: board.id,
                        })
                    }

                    addColumnService(createColumnService(column.name, board.id))
                })
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
