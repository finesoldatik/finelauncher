import { Sort, SortOrder, Type } from './voxelworld.type'

//
// Mods
//

//// Params

export interface ModsParams {
	params: {
		title?: string
		tag_id?: number[]
		sort?: Sort
		sortOrder: SortOrder
		page?: number
		item_count?: number
	}
}

//// Response

export interface ModsResponse {
	data: {
		data: Mod[]

		links: Links
		meta: Meta
	}
}

//// Other

export interface Mod {
	id: number
	title: string
	description: string
	downloads: number
	likes: number
	lastUpdateMessage: string
	author: Author
	tags: Tag[]

	pathLogo: string
}

interface Links {
	first: string
	last: string
	prev: string | null
	next: string | null
}

interface Meta {
	current_page: number
	from: number
	last_page: number
	links: MetaLinks[]

	path: string
	per_page: number
	to: number
	total: number
}

interface MetaLinks {
	url: string
	label: string
	active: false
}

//
// ModDetail
//

//// Response

export interface ModDetailResponse {
	data: {
		data: {
			id: number
			author: Author
			title: string
			description: string
			downloads: number
			likes: number
			isLiked: null
			tags: Tag[]

			pathLogo: string
			detail_description: DetailDescription
		}
	}
}

//
// Mods & ModDetail & Texturepacks
//

interface Author {
	id: number
	name: string
	avatar: string
	isAvatar: boolean
}

//
// Tags
//

//// Params

export interface TagParams {
	params: {
		type?: Type
	}
}

//// Response

export interface TagResponse {
	data: {
		data: Tag[]
	}
}

//// Other

export interface Tag {
	id: number
	title: string
}

//
// Texturepacks
//

//// Params

export interface TexturepacksParams {
	params: {
		title?: string
		tag_id?: number[]
		sort?: number
		sortOrder?: SortOrder
		page?: number
		item_count?: number
	}
}

//// Response

export interface TexturepacksResponse {
	data: {
		data: Texturepack[]
		links: Links

		meta: Meta
	}
}

//// Other

interface Texturepack {
	id: number
	title: string
	description: string
	downloads: number
	likes: number
	lastUpdateMessage: string
	author: Author
	tags: Tag[]
	pathLogo: string
}

//
// TexturpackDetail
//

//// Response

export interface TexturepackDetailResponse {
	data: {
		data: {
			id: number
			author: Author
			title: string
			description: string
			downloads: number
			likes: number
			isLiked: null
			tags: Tag[]
			pathLogo: string
			detail_description: TexturepackDetailDescription
		}
	}
}

//// Other

interface TexturepackDetailDescription {
	time: string
	version: string
}

//
// Versions
//

//// Params

export interface VersionsParams {
	params: {
		type: Type
		page?: number
		item_count?: number
	}
}

//// Response

export interface VersionsResponse {
	data: {
		data: Version[]
		links: Links
		meta: Meta
	}
}

//// Other

interface VersionEngine {
	id: number
	version_number: string
}

//
// Version & VersionDetail
//

interface Version {
	id: number
	status: VersionStatus
	version_number: string
	path: string
	changelog: string
	engine: VersionEngine[]
	engine_format: string
	created_at: string
}

interface VersionStatus {
	id: number
	title: string
}

//
// VersionDetail
//

//// Params

export interface VersionDetailParams {
	params: {
		type: Type
	}
}

//// Response

export interface VersionDetailResponse {
	data: {
		data: {
			id: number
			status: VersionStatus
			version_number: string
			path: string
			changelog: string
			engine: VersionEngine
			engine_format: string
			created_at: string
		}
	}
}

//
// Worlds
//

//// Params

export interface WorldsParams {
	params: {
		title?: string
		tag_id?: number[]
		sort?: Sort
		sortOrder: SortOrder
		page?: number
		item_count?: number
	}
}

//// Response

export interface WorldsResponse {
	data: {
		data: World[]
		links: Links
		meta: Meta
	}
}

//// Other

interface World {
	id: number
	title: string
	description: string
	downloads: number
	likes: number
	lastUpdateMessage: string
	author: Author
	tags: Tag[]
	pathLogo: string
}

//
// ModDetail & WorldDetail
//

interface DetailDescription {
	time: string
	blocks: Block[]

	version: string
}

interface Block {
	id: string
	type: string
	data: {
		text: string
	}
}

//
// WorldDetail
//

//// Response

export interface WorldDetailResponse {
	data: {
		data: {
			id: number
			author: Author
			title: string
			description: string
			downloads: number
			likes: number
			isLiked: null
			tags: Tag[]
			pathLogo: string
			detail_description: DetailDescription
		}
	}
}
