'use client'

import DarkThemeIcon from 'assets/svg-icons/DarkThemeIcon'
import LightThemeIcon from 'assets/svg-icons/LightThemeIcon'
import { Switch } from 'ui/switch'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeToggler = () => {
    const { theme, setTheme } = useTheme()
    const [currentTheme, setCurrentTheme] = useState('')

    useEffect(() => {
        window.localStorage.setItem('theme', theme as string)
        setCurrentTheme(theme as string)
    }, [theme])

    return (
        <div className='flex justify-center items-center bg-grey-secondary py-[14px] mx-6 gap-6 rounded-md my-4 dark:bg-very-dark-grey'>
            <LightThemeIcon className='fill-grey-ternary' />
            <Switch
                checked={currentTheme === 'dark'}
                onCheckedChange={(checked) =>
                    setTheme(checked ? 'dark' : 'light')
                }
            />
            <DarkThemeIcon className='fill-grey-ternary' />
        </div>
    )
}

export default ThemeToggler
