export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className='flex justify-center items-center p-4 min-h-screen min-w-screen dark:bg-very-dark-grey'>
            {children}
        </div>
    )
}
