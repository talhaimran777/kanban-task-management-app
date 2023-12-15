import Typography from 'custom/typography'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'ui/form'
import { Input } from 'ui/input'

interface Props {
  name: string
  control: any
  label: string
  placeholder: string
  hideLabel?: boolean
}

const FormInputGroup = ({
  name,
  label,
  placeholder,
  control,
  hideLabel = false,
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
                <Typography text={label} variant='heading' size='small' />
              </FormLabel>
            )}
            <FormControl className='dark:bg-dark-grey dark:border-grey-ternary focus-visible:ring-purple-primary dark:focus-visible:ring-purple-primary focus-visible:ring-offset-0 focus-visible:ring-2'>
              <Input placeholder={placeholder} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}

export default FormInputGroup
