import { IMods } from '../../pages/ModsPage/ModsPage.interface'

interface IMod {
	author: {
		id: number
		name: string
		avatar: string
		isAvatar: boolean
	}

	description: string
	downloads: number
	id: number
	lastUpdateMessage: string
	likes: number
	pathLogo: string

	tags: {
		id: number
		title: string
	}[]

	title: string
}

export type setMods = React.Dispatch<React.SetStateAction<IMods>>

export interface ModProps {
	mod: IMod
	setMods: setMods
}
