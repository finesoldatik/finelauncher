import { faHouse, faGamepad, faGear, faCircleDown, faDownload } from '@fortawesome/free-solid-svg-icons'

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
]

export const bottomItems = [
	{
		id: 3,
		icon: faDownload,
		link: '#',
		tooltip: 'settingsPage.tooltip',
	},
	{
		id: 4,
		icon: faGear,
		link: '/settings',
		tooltip: 'settingsPage.tooltip',
	},
]

export const items = [...topItems, ...bottomItems]
