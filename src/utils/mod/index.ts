import axios from 'axios'

const defaultUrl: string = 'https://voxelworld.ru/api/mods'

export interface ModsConfig {
	params: {
		title?: string
		tag_id?: number[]
		page?: number
		sort?: number
		item_count?: number
	}
}

export default class ModWrapper {
	url: string

	constructor(url: string = defaultUrl) {
		this.url = url
	}

	async getMods(config?: ModsConfig) {
		return await axios.get(this.url, config)
	}

	async getMod(id: number) {
		return await axios.get(`${this.url}/${id}`)
	}
}
