import { path } from '@tauri-apps/api'
import { invoke } from '@tauri-apps/api/core'
import * as fs from '@tauri-apps/plugin-fs'
import * as shell from '@tauri-apps/plugin-shell'
import * as os from '@tauri-apps/plugin-os'
import { Version } from './version'
import { deleteDir } from './download'

// Util

export const launcherDirName = 'finelauncher'

export const getLauncherPath = async () => {
	return path.documentDir().then(v => path.join(v, launcherDirName))
}

export const normalizeFilename = (filename: string) => {
	return filename
		.replace(/[\\/:*?"<>|.]/g, '')
		.replace(/\s/g, '-')
		.toLowerCase()
		.substring(0, 240)
}

export const getFilesByExtension = async (path: string, ext: string) => {
	return fs
		.readDir(path)
		.then(files => files.filter(f => f.name?.endsWith(ext)))
}

// Instances path

export const getInstancesPath = async () => {
	return path
		.documentDir()
		.then(v => path.join(v, launcherDirName, 'instances'))
}

export const getInstancePath = async (instanceName: string) => {
	return getInstancesPath().then(v =>
		path.join(v, normalizeFilename(instanceName))
	)
}

export const getInstanceContent = async (instanceName: string) => {
	return await fs.readDir(
		await path.join(await getInstancePath(instanceName), 'game', 'content')
	)
}

// Remove/Check

export const createInstance = async (instanceName: string) => {
	return fs
		.mkdir(await getInstancePath(instanceName))
		.catch(r => console.log('Error while creating instance directory!', r))
}

export const removeInstance = async (instanceName: string) => {
	fs.remove(await getInstancePath(instanceName), { recursive: true }).catch(
		r => {
			console.error('Error while deleting instance directory!', r)
		}
	)
}

export const getInstalledInstances = async () => {
	return fs
		.readDir(await getInstancesPath(), {
			baseDir: fs.BaseDirectory.Document,
		})
		.catch(() => {
			getInstancesPath().then(v => fs.mkdir(v, { recursive: true }))
			return []
		})
}

export const instanceExists = async (instanceName: string) => {
	return fs.exists(await getInstancePath(instanceName))
}

// Game options

export const openInFileManager = async (instanceName: string) => {
	const fpath = await getInstancePath(instanceName)
	const platform = os.platform()
	console.log(fpath, platform)
	if (String(platform) == 'win32')
		shell.Command.create('explorer', fpath).execute()
	else if (String(platform) == 'linux')
		shell.Command.create('xdg-open', fpath).execute()
}

// Run

export const runGame = async (instanceName: string) => {
	const platform = os.platform()
	const instancePath = await getInstancePath(instanceName)
	const instanceData = await getInstanceDataFromPath(instancePath)
	const gamePath = await path.join(instancePath, 'game')

	let executable: string
	if (instanceData.version.git) {
		console.log('Git repo detected, building from source')
		executable = await path.join(
			gamePath,
			await invoke('build_game', {
				source_path: gamePath,
				build_commands:
					instanceData.version.repository.buildCommands[String(platform)],
			})
		)
	} else {
		executable = String(
			(
				await getFilesByExtension(
					gamePath,
					String(platform) == 'win32' ? '.exe' : '.AppImage'
				)
			).shift()?.path
		)
	}

	console.log('Running game: ' + executable)
	if (!executable) return console.error('No game executable found!')
	if (String(platform) == 'linux')
		await shell.Command.create('chmod', ['+x', executable]).execute()

	invoke('run_game', {
		executable: executable,
		instance_path: gamePath,
	})
}

export const terminateProcess = async (processId: number) => {
	console.log(processId)
	invoke('terminate_process', { pid: processId }) // заменил new Child(processId).kill()
}

// Instance data

export const getInstanceDataFromPath = async (instancePath: string) => {
	const data = JSON.parse(
		await path.join(instancePath, 'instance.json').then(p => fs.readTextFile(p))
	) as InstanceData

	return data
}

export const getInstanceData = async (instanceName: string) => {
	const data = JSON.parse(
		await getInstancePath(instanceName).then(v =>
			path.join(v, 'instance.json').then(p => fs.readTextFile(p))
		)
	) as InstanceData

	return data
}

export const saveInstanceData = async function (
	instanceName: string,
	data: InstanceData
) {
	getInstancePath(instanceName).then(v =>
		path
			.join(v, 'instance.json')
			.then(p => fs.writeTextFile(p, JSON.stringify(data)))
	)
}

export const deleteInstance = async (version: string) => {
	return deleteDir(await getInstancePath(version))
}

export interface InstanceData {
	name: string
	version: Version
	icon: string // Можно назначить кастомную иконку
	runParameters: string // И аргументы для запуска свои
	platform: string | null // Если придётся таскать папку с инстансами по компам, поможет. Можно тупа не отображать эту версию, либо докачать саму игру под нужную платформу.
	options: any // Можно менять непосредственно этот тип и добавить ещё параметры, но думаю пока норм.
}