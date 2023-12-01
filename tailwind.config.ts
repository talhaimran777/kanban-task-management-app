import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#635FC7',
        'purple-secondary': '#A8A4FF',
        'red-primary': '#EA5555',
        'red-secondary': '#FF9898',
        'black-primary': '#000112',
        'grey-primary': '#F4F7FD',
        'grey-ternary': '#828FA3',
      },
    },
  },
  plugins: [],
}
export default config
