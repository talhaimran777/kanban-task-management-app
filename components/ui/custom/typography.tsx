import clsx from 'clsx'
import { TypographyStyles } from 'types/typography'

const Typography = ({
    text,
    variant,
    size,
    className,
}: {
    text: string
    variant: 'heading' | 'body'
    size: 'small' | 'medium' | 'large' | 'extraLarge'
    className?: string
}) => {
    const styles: TypographyStyles = {
        heading: {
            extraLarge: 'text-2xl leading-[30px]',
            large: 'text-lg leading-[23px]',
            medium: 'text-[15px] leading-[19px]',
            small: 'text-xs leading-[15px]',
            common: 'font-bold',
        },
        body: {
            extraLarge: '',
            large: '',
            medium: 'text-[13px] leading-[23px]',
            small: '',
            common: '',
        },
    }

    return (
        <h1
            className={clsx(
                styles[variant][size],
                styles[variant]['common'],
                className
            )}
        >
            {text}
        </h1>
    )
}

export default Typography
