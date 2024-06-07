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
		tooltip: 'Главная',
	},
	{
		id: 1,
		icon: faGamepad,
		link: '/instances',
		tooltip: 'Инстансы',
	},
	{
		id: 2,
		icon: faCube,
		link: '/mods',
		tooltip: 'Моды',
	},
]

export const bottomItems = [
	{
		id: 3,
		icon: faGear,
		link: '/settings',
		tooltip: 'Настройки',
	},
]

export const items = [...topItems, ...bottomItems]
