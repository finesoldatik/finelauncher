import { fs, path, invoke, os } from '@tauri-apps/api' // http,
import {
	InstanceData,
	getInstancePath,
	saveInstanceData,
} from './instanceManager'
import { saveMods } from './mod'
import { defaultRepos } from './version'

export const download = async (
	url: string,
	dest: string,
	out_filename: string
) => {
	return invoke('download_file', { url, dest, out_filename })
}

export const downloadMod = async (
	url: string,
	instanceName: string,
	modId: number
) => {
	const contentPath = await getInstancePath(instanceName).then(v =>
		path.join(v, 'game/content/')
	)

	const modPath = await path.join(contentPath, 'temp_dir')

	if (!(await fs.exists(modPath))) {
		await fs.createDir(modPath)
		return download(url, modPath, 'mod.zip').then(() => {
			saveMods(modPath, contentPath, instanceName, modId)
		})
	} else
		deleteDir(await path.join(modPath)).then(async () => {
			await fs.createDir(modPath)

			return download(url, modPath, 'mod.zip').then(() => {
				saveMods(modPath, contentPath, instanceName, modId)
			})
		})
}

export const downloadVersion = async (
	url: string,
	instanceName: string,
	instanceVersion: string
) => {
	const instancePath = await getInstancePath(instanceName)
	await fs.createDir(await path.join(instancePath, 'game/content'), {
		recursive: true,
	})

	let outFileName: string

	const platform = await os.platform()

	if (platform !== 'win32') outFileName = 'version.AppImage'
	else outFileName = 'version.zip'

	const repo = defaultRepos.find(
		value => value.name === instanceVersion.split(' ')[0]
	)

	const icon = `/img/instance/${repo?.name.toLowerCase()}.png`

	console.log(icon)

	const instanceData: InstanceData = {
		name: instanceName,
		gameVersion: instanceVersion,
		icon,
		runParameters: '',
		platform,
		options: null,
	}

	return download(url, await path.join(instancePath, 'game'), outFileName).then(
		() => saveInstanceData(instanceName, instanceData)
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
