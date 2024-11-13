import {
	faGamepad,
	faGear,
	faDownload,
} from '@fortawesome/free-solid-svg-icons'

export const topItems = [
	{
		id: 1,
		icon: faGamepad,
		link: '/',
		tooltip: 'instancesPage.tooltip',
	},
]

export const bottomItems = [
	{
		id: 2,
		icon: faDownload,
		link: '#',
		tooltip: 'settingsPage.tooltip',
	},
	{
		id: 3,
		icon: faGear,
		link: '/settings',
		tooltip: 'settingsPage.tooltip',
	},
]

export const items = [...topItems, ...bottomItems]
