interface IAuthor {
	id: number
	name: string
	avatar: string
	isAvatar: boolean
}

export interface IContent {
	author: IAuthor

	description: string
	downloads: number
	id: number
	lastUpdateMessage: string
	likes: number
	pathLogo: string

	tags: ITag[]

	title: string
}

export interface ITag {
	id: number
	title: string
}

export interface IMods {
	content: IContent[]

	tags: ITag[]
}
