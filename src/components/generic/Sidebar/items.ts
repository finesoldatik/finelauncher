import {
	faGamepad,
	faGear,
	faDownload,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

interface Item {
	id: number
	icon: IconDefinition
	link: string
	tooltip: string
}

export const topItems: Item[] = [
	{
		id: 0,
		icon: faGamepad,
		link: '/',
		tooltip: 'instancesPage.tooltip',
	},
]

export const bottomItems: Item[] = [
	{
		id: 1,
		icon: faDownload,
		link: '#',
		tooltip: 'downloadsPage.tooltip',
	},
	{
		id: 2,
		icon: faGear,
		link: '/settings',
		tooltip: 'settingsPage.tooltip',
	},
]

export const items: Item[] = [...topItems, ...bottomItems]
