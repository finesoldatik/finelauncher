// import ModWrapper, { ModsConfig } from './Wrapper'
// import { setMods } from '../../pages/ModsPage/components/Mod/Mod.interface'
// import { IMods } from '../../pages/ModsPage/ModsPage.interface'
import { getInstancePath, normalizeFilename } from '../instanceManager'
import { FileEntry } from '@tauri-apps/api/fs'

// type getModsByTag = (
// 	modWrapper: ModWrapper,
// 	setMods: setMods,
// 	tag_id: number[]
// ) => void

// type getModsBySearchQuery = (
// 	modWrapper: ModWrapper,
// 	setMods: setMods,
// 	searchQuery: string
// ) => void

// export const getModsByTag: getModsByTag = (
// 	modWrapper: ModWrapper,
// 	setMods: setMods,
// 	tag_id: number[]
// ) => {
// 	console.log('Search by Tag:', tag_id)
// 	modWrapper.getMods({ params: { tag_id } }).then(response => {
// 		console.log(response.data.data)
// 		setMods(response.data.data)
// 	})
// }

// export const getModsBySearchQuery: getModsBySearchQuery = (
// 	modWrapper: ModWrapper,
// 	setMods: setMods,
// 	searchQuery: string
// ) => {
// 	console.log('Search by Query:', searchQuery)
// 	let config: ModsConfig = { params: { item_count: 1000 } }
// 	if (searchQuery !== '') config = { params: { title: searchQuery } }
// 	modWrapper.getMods(config).then(response => {
// 		if (response.data.data.content.length) setMods(response.data.data)
// 		else {
// 			const error: IMods = {}
// 			setMods(error)
// 		}
// 	})
// }

export const modExists = async (
	instanceName: string,
	modName: string
) => {
	const { fs, path } = await import('@tauri-apps/api')
	const modPath = await getInstancePath(instanceName).then(v =>
		path.join(v, 'game/content', normalizeFilename(modName))
	)
	return fs.exists(modPath)
}

const findMods = (file: FileEntry) => {
	if (file.children) {
		const children = file.children.filter(value => {
			console.log('value', value)
			if (value.name === 'package.json') return value
		})
		console.log('children', children)

		if (children.length) return children
	} else {
		console.log('file', file)
		if (file.name === 'package.json') return file
	}
}

export const saveMods = async (modPath: string, contentPath: string) => {
	const { fs, path } = await import('@tauri-apps/api')
	const files = await fs.readDir(modPath, { recursive: true })
	console.log('paths', files)

	const mods = files.filter(file => findMods(file))
	console.log('mods', mods)

	mods.forEach(async mod => {
		if (mod.name === 'package.json') {
			const data = JSON.parse(await fs.readTextFile(mod.path))
			console.log(data)
			const modDir = await path.join(contentPath, data.id)
			fs.createDir(modDir)

			const modContent = await fs.readDir(modPath)
			modContent.forEach(async value => {
				fs.renameFile(
					String(value.path),
					await path.join(modDir, String(value.name))
				)
			})
			console.log('mod saved')
		} else {
			const modContent = await fs.readDir(String(mod.path), { recursive: true })
			console.log('modContent', modContent)
			modContent.forEach(async value => {
				if (value.name === 'package.json') {
					const data = JSON.parse(await fs.readTextFile(value.path))
					const modDir = await path.join(contentPath, data.id)
					fs.createDir(modDir)
					modContent.forEach(async value => {
						fs.renameFile(
							String(value.path),
							await path.join(modDir, String(value.name))
						)
					})
				}
			})
			console.log('mod saved')
		}
	})
}
