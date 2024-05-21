interface IContent {
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

interface ITag {
	id: number
	title: string
}

export interface IMods {
	content?: IContent[]

	tags?: ITag[]
}
