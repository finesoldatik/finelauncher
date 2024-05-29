import { fs, path, invoke, os } from '@tauri-apps/api' // http,
import { getInstancePath } from './versionManager'
import { saveMods } from './mod'

type download = (
	url: string,
	dest: string,
	out_filename: string
) => Promise<void>

type downloadMod = (
	url: string,
	instanceName: string,
	modName: string
) => Promise<void>

type downloadVersion = (
	url: string,
	instanceName: string,
	instanceVersion: string
) => Promise<void>

export const download: download = async (
	url: string,
	dest: string,
	out_filename: string
) => {
	return invoke('download_file', { url, dest, out_filename })
}

export const downloadMod = async (url: string, instanceName: string) => {
	const contentPath = await getInstancePath(instanceName).then(v =>
		path.join(v, 'game/content/')
	)

	const modPath = await path.join(contentPath, 'temp_dir')

	if (!(await fs.exists(modPath))) {
		await fs.createDir(modPath)
		return download(url, modPath, 'mod.zip').then(() => {
			saveMods(modPath, contentPath)
		})
	} else
		deleteDir(await path.join(modPath)).then(async () => {
			await fs.createDir(modPath)

			return download(url, modPath, 'mod.zip').then(() => {
				saveMods(modPath, contentPath)
			})
		})
}

export const downloadVersion: downloadVersion = async (
	url: string,
	instanceName: string,
	instanceVersion: string
) => {
	const instancePath = await getInstancePath(instanceName)
	await fs.createDir(await path.join(instancePath, 'game/content'), {
		recursive: true,
	})

	let outFileName: string

	if ((await os.platform()) !== 'win32') outFileName = 'version.AppImage'
	else outFileName = 'version.zip'

	return download(url, await path.join(instancePath, 'game'), outFileName).then(
		async () => {
			fs.writeFile(await path.join(instancePath, `${instanceVersion}.json`), '')
		}
	)
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
