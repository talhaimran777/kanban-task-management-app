import clsx from 'clsx'
import React from 'react'
import { cn } from 'src/utils'

interface Props {
    text: string
    variant: 'primary' | 'secondary' | 'danger'
    size: 'large' | 'small'
    fluid?: boolean
    icon?: React.ReactNode
}

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        Props {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, fluid, size, text, icon, ...props }, ref) => {
        const colors = {
            primary:
                'bg-purple-primary text-white hover:bg-purple-secondary focus-visible:ring-white focus-visible:ring-2',
            secondary:
                'bg-[#EFEFF9] text-purple-primary hover:bg-[#D8D7F1] focus-visible:ring-purple-primary focus-visible:ring-2',
            danger: 'bg-red-primary text-white hover:bg-red-secondary',
        }

        const sizes = {
            large: 'text-[15px] py-[15px] px-[18px]',
            small: 'text-xs py-3 px-[12px]',
        }

        const common = {
            'font-bold': true,
            'rounded-full': true,
            'w-full': !!fluid,
            transition: true,
        }
        return (
            <button
                className={cn(
                    clsx(colors[variant], sizes[size], common),
                    className
                )}
                ref={ref}
                {...props}
            >
                {!!icon ? icon : null}
                {text}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button
