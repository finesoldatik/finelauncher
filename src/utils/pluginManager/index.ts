import { fs, path } from '@tauri-apps/api'
import { launcherDirName, normalizeFilename } from '../instanceManager'
import { IRepository, defaultRepos } from '../version'

// Plugins Path

export const getPluginsPath = async () => {
	return path.documentDir().then(v => path.join(v, launcherDirName, 'plugins'))
}

export const getPluginPath = async (pluginName: string) => {
	return getPluginsPath().then(v => path.join(v, normalizeFilename(pluginName)))
}

// Remove/Check

export const createPlugin = async (pluginName: string) => {
	const pluginPath = await getPluginPath(pluginName)
	const data = {
		name: 'pluginName',
		icon: null,
		customRepos: defaultRepos,
	} as PluginData

	return fs
		.createDir(pluginPath)
		.then(() => {
			path
				.join(pluginPath, 'plugin.json')
				.then(p => fs.writeTextFile(p, JSON.stringify(data)))
		})
		.catch(r => console.log('Error while creating plugin directory!', r))
}

export const removePlugin = async (pluginName: string) => {
	fs.removeDir(await getPluginPath(pluginName)).catch(r => {
		console.error('Error while deleting plugin directory!', r)
	})
}

export const getPlugins = async () => {
	return fs
		.readDir(await getPluginsPath(), {
			dir: fs.BaseDirectory.Document,
			recursive: true,
		})
		.catch(() => {
			getPluginsPath().then(v => fs.createDir(v, { recursive: true }))
			return []
		})
}

export const pluginExists = async (pluginName: string) => {
	return fs.exists(await getPluginPath(pluginName))
}

// Plugin data

export const getPluginDataFromPath = async (pluginPath: string) => {
	const data = JSON.parse(
		await path.join(pluginPath, 'plugin.json').then(p => fs.readTextFile(p))
	) as PluginData

	return data
}

export const getPluginData = async (pluginName: string) => {
	const data = JSON.parse(
		await getPluginPath(pluginName).then(v =>
			path.join(v, 'plugin.json').then(p => fs.readTextFile(p))
		)
	) as PluginData

	return data
}

export const savePluginData = async function (
	pluginName: string,
	data: PluginData
) {
	getPluginPath(pluginName).then(v =>
		path
			.join(v, 'plugin.json')
			.then(p => fs.writeTextFile(p, JSON.stringify(data)))
	)
}

export interface PluginData {
	name: string
	icon: string | null
	customRepos: IRepository[]
}
