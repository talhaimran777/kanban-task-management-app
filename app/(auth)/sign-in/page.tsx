import { SignIn } from '@clerk/nextjs'

type Props = {
    searchParams: {
        redirectUrl: string
    }
}

const Page = async ({ searchParams }: Props) => {
    const { redirectUrl } = searchParams

    return <SignIn redirectUrl={redirectUrl || '/'} />
}

export default Page