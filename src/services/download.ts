import * as path from '@tauri-apps/api/path'
import * as os from '@tauri-apps/plugin-os'
import * as shell from '@tauri-apps/plugin-shell'
import { invoke } from '@tauri-apps/api/core'
import {
	InstanceData,
	getInstancePath,
	saveInstanceData,
} from './instanceManager'
import { Version } from './version'
import { saveMods } from './mod' ////////////////////
import * as fs from '@tauri-apps/plugin-fs'

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
		await fs.mkdir(modPath, { recursive: true })
		return download(url, modPath, 'mod.zip').then(() => {
			saveMods(modPath, contentPath, instanceName, modId)
		})
	} else
		fs.remove(await path.join(modPath), { recursive: true }).then(async () => {
			await fs.mkdir(modPath, { recursive: true })

			return download(url, modPath, 'mod.zip').then(() => {
				saveMods(modPath, contentPath, instanceName, modId)
			})
		})
}

export const downloadVersion = async (
	version: Version,
	instanceName: string
) => {
	version.repository.releases = []

	const instancePath = await getInstancePath(instanceName)
	if (!version.git) {
		await fs.mkdir(await path.join(instancePath, 'game/content'), {
			recursive: true,
		})
	}

	const platform = await os.platform()
	let outFileName: string
	if (version.git) outFileName = 'game'
	else if (platform !== 'windows') outFileName = 'version.AppImage'
	else outFileName = ''

	const icon = `/img/instance/${version.repository?.icon}`
	const instanceData: InstanceData = {
		name: instanceName,
		version,
		icon,
		runParameters: '',
		platform,
		options: null,
	}

	if (version.git) {
		instanceData.platform = null
		console.log('git', [
			'clone',
			version.url,
			await path.join(instancePath, 'game'),
		])
		const clone = shell.Command.create('git', [
			'clone',
			version.url,
			await path.join(instancePath, 'game'),
		])
		clone.stdout.on('data', (out: any) => console.log(out))
		clone.stderr.on('data', (err: any) => console.error(err))
		return clone.execute().then(() => {
			path
				.join(instancePath, 'game/content')
				.then(contentPath => fs.mkdir(contentPath, { recursive: true }))
				.then(() => saveInstanceData(instanceName, instanceData))
		})
	} else {
		return download(
			version.url,
			await path.join(instancePath, 'game'),
			outFileName
		).then(() => saveInstanceData(instanceName, instanceData))
	}
}
