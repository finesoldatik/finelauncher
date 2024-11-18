import {
	faGamepad,
	faGear,
	faDownload,
	IconDefinition,
} from '@fortawesome/free-solid-svg-icons'

interface Item {
	icon: IconDefinition
	link: string
	tooltip: string
}

export const topItems: Item[] = [
	{
		icon: faGamepad,
		link: '/',
		tooltip: 'instancesPage.tooltip',
	},
]

export const bottomItems: Item[] = [
	{
		icon: faDownload,
		link: '#',
		tooltip: 'downloadsPage.tooltip',
	},
	{
		icon: faGear,
		link: '/settings',
		tooltip: 'settingsPage.tooltip',
	},
]

export const items: Item[] = [...topItems, ...bottomItems]
