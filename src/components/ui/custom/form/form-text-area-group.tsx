import Typography from 'src/components/ui/custom/typography'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from 'src/components/ui/form'
import { Textarea } from 'src/components/ui/textarea'

interface Props {
    name: string
    control: any
    label: string
    placeholder: string
    hideLabel?: boolean
    onPaste?: (event: React.ClipboardEvent<HTMLTextAreaElement>) => void
}

const FormTextAreaGroup = ({
    name,
    label,
    placeholder,
    control,
    hideLabel = false,
    ...rest
}: Props) => {
    return (
        <div className='flex-1'>
            <FormField
                control={control}
                name={name}
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
                        <FormControl className='dark:bg-dark-grey dark:border-grey-ternary focus-visible:ring-purple-primary dark:focus-visible:ring-purple-primary focus-visible:ring-offset-0 focus-visible:ring-2'>
                            <Textarea
                                placeholder={placeholder}
                                {...field}
                                {...rest}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default FormTextAreaGroup
