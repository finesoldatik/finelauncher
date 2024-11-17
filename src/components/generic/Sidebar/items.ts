import {
	faGamepad,
	faGear,
	faDownload,
} from '@fortawesome/free-solid-svg-icons'

export const topItems = [
	{
		icon: faGamepad,
		link: '/',
		tooltip: 'instancesPage.tooltip',
	},
]

export const bottomItems = [
	{
		icon: faDownload,
		link: '#',
		tooltip: 'settingsPage.tooltip',
	},
	{
		icon: faGear,
		link: '/settings',
		tooltip: 'settingsPage.tooltip',
	},
]

export const items = [...topItems, ...bottomItems]
