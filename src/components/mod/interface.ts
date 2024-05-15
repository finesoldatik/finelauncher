import { IMods } from '../../pages/ModsPage/interface'

export type setMods = React.Dispatch<React.SetStateAction<IMods>>

export interface IProps {
	mod: IMod
	setMods: setMods
}

export interface IMod {
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
