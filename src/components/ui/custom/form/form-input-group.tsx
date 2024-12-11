import Typography from 'src/components/ui/custom/typography'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'src/components/ui/form'
import { Input } from 'src/components/ui/input'

interface Props {
    name: string
    control: any
    label: string
    placeholder?: string
    hideLabel?: boolean
    disabled?: boolean
    value?: string
}

const FormInputGroup = ({
    name,
    label,
    placeholder,
    control,
    hideLabel = false,
    disabled = false,
    value = '',
}: Props) => {
    return (
        <div className='flex-1'>
            <FormField
                control={control}
                name={name}
                disabled={disabled}
                render={({ field }) => (
                    <FormItem>
                        {!hideLabel && (
                            <FormLabel>
                                <Typography
                                    text={label}
                                    variant='heading'
                                    size='small'
                                />
                            </FormLabel>
                        )}
                        <FormControl className='dark:bg-dark-grey dark:border-grey-ternary focus-visible:ring-purple-primary dark:focus-visible:ring-purple-primary focus-visible:ring-offset-0 focus-visible:ring-2 disabled:cursor-default'>
                            <Input
                                {...field}
                                placeholder={placeholder}
                                value={
                                    name === 'status' && !!value
                                        ? value
                                        : field.value
                                }
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default FormInputGroup
