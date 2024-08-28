// import ModWrapper, { ModsConfig } from './Wrapper'
// import { setMods } from '../../pages/ModsPage/components/Mod/Mod.interface'
// import { IMods } from '../../pages/ModsPage/ModsPage.interface'
import { fs, path } from '@tauri-apps/api'
import { getInstancePath, normalizeFilename } from './instanceManager'
import { FileEntry } from '@tauri-apps/api/fs'
import { deleteDir } from './download'

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

export const modExists = async (instanceName: string, modName: string) => {
	const { fs, path } = await import('@tauri-apps/api')
	const modPath = await getInstancePath(instanceName).then(v =>
		path.join(v, 'game/content', normalizeFilename(modName))
	)
	return fs.exists(modPath)
}

const findMods = (file: FileEntry) => {
	if (file.name === 'package.json') return file
	else if (file.children) {
		const children = file.children.filter(value => {
			if (value.name === 'package.json') return value
			else {
				if (!value.children) return
				const children1 = value.children.filter(value => {
					console.log(value, value.name === 'package.json')
					if (value.name === 'package.json') return value
				})

				console.log(children1)

				if (children1.length) return children1[0]
			}
		})

		if (children.length) return children[0]
	}
}

export const saveMods = async (
	modPath: string,
	contentPath: string,
	instanceName: string,
	modId: number
) => {
	const { fs, path } = await import('@tauri-apps/api')
	const files = await fs.readDir(modPath, { recursive: true })

	const mods = files.map(value => findMods(value))
	console.log(mods)

	mods.forEach(async mod => {
		if (!mod) return
		if (mod.name === 'package.json') {
			const data = JSON.parse(await fs.readTextFile(mod.path))

			const modData: ModData = {
				name: data.id,
				id: modId,
			}
			saveModData(instanceName, data.id, modData)

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
			const modContent = await fs.readDir(String(mod.path), {
				recursive: true,
			})
			modContent.forEach(async value => {
				if (value.name === 'package.json') {
					const data = JSON.parse(await fs.readTextFile(value.path))

					const modData: ModData = {
						name: data.id,
						id: modId,
					}
					saveModData(instanceName, data.id, modData)

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

export const getModDataFromInstancePath = async (
	instancePath: string,
	modName: string
) => {
	const data = JSON.parse(
		await path
			.join(instancePath, 'game', 'content', modName, 'mod.json')
			.then(p => fs.readTextFile(p))
	) as ModData

	return data
}

export const getModData = async (instanceName: string, modName: string) => {
	const data = JSON.parse(
		await getInstancePath(instanceName).then(v =>
			path
				.join(v, 'game', 'content', modName, 'mod.json')
				.then(p => fs.readTextFile(p))
		)
	) as ModData

	return data
}

export const saveModData = async function (
	instanceName: string,
	modName: string,
	data: ModData
) {
	getInstancePath(instanceName).then(v =>
		path
			.join(v, 'game', 'content', modName, 'mod.json')
			.then(p => fs.writeTextFile(p, JSON.stringify(data)))
	)
}

export const deleteMod = async (version: string, mod: string) => {
	return deleteDir(
		await path.join(await getInstancePath(version), 'game/content', mod)
	)
}

export interface ModData {
	name: string
	id: number
}
