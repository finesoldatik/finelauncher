import type { Config } from 'tailwindcss'

const config: Config = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			keyframes: {
				fadeOut: {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(-20px)' },
				},
			},
			animation: {
				fadeOut: 'fadeOut 0.5s forwards',
			},
		},
	},
	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'fantasy',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter',
			{
				example: {
					primary: '#3b82f6',
					secondary: '#67e8f9',
					accent: '#60a5fa',
					neutral: '#60a5fa',
					'base-100': '#1e3a8a',
					info: '#0ea5e9',
					success: '#10b981',
					warning: '#d97706',
					error: '#be123c',
				},
			},
		],
	},
	plugins: [require('daisyui')],
}
export default config
