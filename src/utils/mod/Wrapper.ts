import { fs, path } from '@tauri-apps/api'
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

	async findMods(modPath: string) {
		const paths = await fs.readDir(modPath, { recursive: true })
		const filteredPaths = paths.filter(
			async v => (await path.basename(String(v))) === 'package.json'
		)

		filteredPaths.forEach(async value => {
			const modRootPath = String(value).split('/').slice(0, -1).join('/')
			const modContent = await fs.readDir(modRootPath, { recursive: true })
			console.log('modContent:', modContent)
		})
	}
}
