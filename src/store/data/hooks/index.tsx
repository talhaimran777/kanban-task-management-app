import { useEffect, useState } from 'react'

interface WindowSize {
    width: number
    height: number
}

export const useStore = <T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    callback: (state: T) => F
) => {
    const result = store(callback) as F
    const [data, setData] = useState<F>()

    useEffect(() => {
        setData(result)
    }, [result])

    return data!
}

export const useWindowSize = (): WindowSize => {
    const [size, setSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        const handleResize = () => {
            setSize({ width: window.innerWidth, height: window.innerHeight })
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return size
}
