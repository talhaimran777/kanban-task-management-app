import clsx from 'clsx'

const Button = ({
  text,
  variant,
  size,
  fluid,
}: {
  text: string
  variant: 'primary' | 'secondary' | 'danger'
  size: 'large' | 'small'
  fluid?: boolean
}) => {
  const colors = {
    primary: 'bg-purple-primary text-white hover:bg-purple-secondary',
    secondary: 'bg-[#EFEFF9] text-purple-primary hover:bg-[#D8D7F1]',
    danger: 'bg-red-primary text-white hover:bg-red-secondary',
  }

  const sizes = {
    large: 'text-[15px] py-[15px] px-[18px]',
    small: 'text-xs py-2 px-[12px]',
  }

  const common = {
    'font-bold': true,
    'rounded-full': true,
    'w-full': !!fluid,
    transition: true,
  }

  return (
    <button className={clsx(colors[variant], sizes[size], common)}>
      {text}
    </button>
  )
}

export default Button
