'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import CrossIcon from 'assets/svg-icons/CrossIcon'
import Button from 'custom/button'
import FormInputGroup from 'custom/form/form-input-group'
import { useFieldArray, useForm } from 'react-hook-form'
import addBoardFormSchema from 'schema/add-board-form-schema'
import editBoardService from 'services/board/editBoardService'
import useDialog from 'store/dialog'
import { Board } from 'types/mock'
import { Form } from 'ui/form'
import { z } from 'zod'

const EditBoardForm = ({ board }: { board: Board }) => {
    const { setOpen, setType } = useDialog()

    const form = useForm<z.infer<typeof addBoardFormSchema>>({
        resolver: zodResolver(addBoardFormSchema),
        defaultValues: {
            name: board.name,
            columns: board.columns,
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

    const onSubmit = async (values: z.infer<typeof addBoardFormSchema>) => {
        try {
            await editBoardService({
                values,
                boardId: board.id,
            })

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
                        key={index}
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
                    onClick={() => append({ name: '' })}
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
