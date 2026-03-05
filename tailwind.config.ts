import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0f2041',
                accent: '#2563eb',
                'bg-light': '#f8f9fb',
                'neutral-slate': '#6b7280',
                success: '#059669',
                warning: '#f59e0b',
                danger: '#dc2626',
            },
            fontFamily: {
                display: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
export default config
