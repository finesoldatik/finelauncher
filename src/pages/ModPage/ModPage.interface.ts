interface IContent {
	author: {
		avatar: string
		id: number
		isAvatar: boolean
		name: string
	}

	description: string
	detail_description: {
		blocks: {
			data: {
				text: string
			}
			id: string
			type: string
		}[]
		time: number
		version: string
	}
	downloads: number
	id: number
	isLiked: null
	likes: number
	pathLogo: string

	tags: {
		id: number
		title: string
	}[]

	title: string
}

interface IVersion {
	changelog: string
	created_at: string
	engine: {
		id: number
		version_number: string
	}[]
	engine_format: string
	id: number
	path: string
	status: { id: number; title: string }
	version_number: string
}

export interface IMod {
	content: IContent
	versions: IVersion[]
}
