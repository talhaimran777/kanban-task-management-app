import { cn } from 'src/utils/cn'

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'animate-pulse rounded-md bg-[#e5e7eb] dark:bg-grey-ternary',
                className
            )}
            {...props}
        />
    )
}

export { Skeleton }
