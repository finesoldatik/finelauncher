import {
	faHouse,
	faGamepad,
	faCube,
	faGear,
} from '@fortawesome/free-solid-svg-icons'

export const topItems = [
	{
		id: 0,
		icon: faHouse,
		link: '/',
		tooltip: 'homePage.tooltip',
	},
	{
		id: 1,
		icon: faGamepad,
		link: '/instances',
		tooltip: 'instancesPage.tooltip',
	},
	{
		id: 2,
		icon: faCube,
		link: '/mods',
		tooltip: 'modsPage.tooltip',
	},
]

export const bottomItems = [
	{
		id: 3,
		icon: faGear,
		link: '/settings',
		tooltip: 'settingsPage.tooltip',
	},
]

export const items = [...topItems, ...bottomItems]
