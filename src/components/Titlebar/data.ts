import { appWindow } from '@tauri-apps/api/window'

export const btns = [
	{
		onClick: () => appWindow.minimize(),
		type: 'btn-minimize',
		image: '/images/titlebar/hide.png',
	},
	{
		onClick: () => appWindow.toggleMaximize(),
		type: 'btn-toggle-maximize',
		image: '/images/titlebar/fullscreen.png',
	},
	{
		onClick: () => appWindow.close(),
		type: 'btn-close',
		image: '/images/titlebar/close.png',
	},
]
