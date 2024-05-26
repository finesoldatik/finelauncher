import { fs, path, invoke } from '@tauri-apps/api' // http,
import { getInstancePath } from './versionManager'
import { saveMods } from './mod'

type download = (url: string, dest: string) => Promise<void>

type downloadMod = (
	url: string,
	instanceName: string,
	modName: string
) => Promise<void>

type downloadVersion = (url: string, instanceName: string) => Promise<void>

export const download: download = async (url: string, dest: string) => {
	return invoke('download_file', { url, dest })
}

export const downloadMod = async (
	url: string,
	instanceName: string,
	modName: string
) => {
	const contentPath = await getInstancePath(instanceName).then(v =>
		path.join(v, 'game/content/')
	)

	const modPath = await path.join(contentPath, modName)

	if (!(await fs.exists(modPath))) await fs.createDir(modPath)

	download(url, modPath).then(() => {
		saveMods(modPath)
	})
}

export const downloadVersion: downloadVersion = async (
	url: string,
	instanceName: string
) => {
	const instancePath = await getInstancePath(instanceName)
	await fs.createDir(await path.join(instancePath, 'game/content'), {
		recursive: true,
	})

	return download(url, await path.join(instancePath, 'game'))
}

export const deleteDir = async (path: string) => {
	return fs.removeDir(path, { recursive: true })
}

export const deleteMod = async (version: string, mod: string) => {
	return deleteDir(
		await path.join(await getInstancePath(version), 'game/content', mod)
	)
}

export const deleteInstance = async (version: string) => {
	return deleteDir(await getInstancePath(version))
}
