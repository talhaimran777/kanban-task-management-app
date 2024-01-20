'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import CrossIcon from 'src/assets/svg-icons/CrossIcon'
import Button from 'src/components/ui/custom/button'
import FormInputGroup from 'src/components/ui/custom/form/form-input-group'
import { useFieldArray, useForm } from 'react-hook-form'
import boardFormSchema from 'src/schema/board-form-schema'
import addBoardService from 'src/services/board/add-board-service'
import { createBoardService } from 'src/services/board/create-board-service'
import makeBoardActive from 'src/services/board/make-board-active'
import addColumnsService from 'src/services/column/add-columns-service'
import useDialog from 'src/store/dialog'
import { Form } from 'src/components/ui/form'
import { z } from 'zod'

const AddBoardForm = () => {
    const { setOpen, setType } = useDialog()

    const form = useForm<z.infer<typeof boardFormSchema>>({
        resolver: zodResolver(boardFormSchema),
        defaultValues: {
            name: '',
            columns: [],
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
            // values contains the board information & column names
            const [board, columns] = createBoardService(values)

            addBoardService(board)
            addColumnsService(columns)
            makeBoardActive(board.id)
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

                {columnsFields.map((_field, index) => (
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
                    onClick={() => append({ id: '', name: '' })}
                />

                <Button
                    type='submit'
                    variant='primary'
                    size='small'
                    fluid={true}
                    text='Create New Board'
                />
            </form>
        </Form>
    )
}

export default AddBoardForm
