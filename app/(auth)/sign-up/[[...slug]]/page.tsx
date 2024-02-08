import { SignUp } from '@clerk/nextjs'

type Props = {
    searchParams: {
        redirectUrl: string
    }
}

const Page = async ({ searchParams }: Props) => {
    const { redirectUrl } = searchParams

    return <SignUp redirectUrl={redirectUrl || '/'} />
}

export default Page
