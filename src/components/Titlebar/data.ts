import { appWindow } from '@tauri-apps/api/window'

export const btns = [
	{
		onClick: () => appWindow.minimize(),
		type: 'btn-minimize',
		svgPath: 'M20 14H4v-4h16',
	},
	{
		onClick: () => appWindow.toggleMaximize(),
		type: 'btn-toggle-maximize',
		svgPath: 'M4 4h16v16H4zm2 4v10h12V8z',
	},
	{
		onClick: () => appWindow.close(),
		type: 'btn-close',
		svgPath:
			'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z',
	},
]
