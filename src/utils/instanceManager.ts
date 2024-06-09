import { fs, invoke, os, path, shell } from '@tauri-apps/api'

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

// Remove/Check

export const createInstance = async (instanceName: string) => {
	return fs
		.createDir(await getInstancePath(instanceName))
		.catch(r => console.log('Error while creating instance directory!', r))
}

export const removeInstance = async (instanceName: string) => {
	fs.removeDir(await getInstancePath(instanceName)).catch(r => {
		console.error('Error while deleting instance directory!', r)
	})
}

export const getInstalledInstances = async () => {
	return fs
		.readDir(await getInstancesPath(), {
			dir: fs.BaseDirectory.Document,
			recursive: true,
		})
		.catch(() => {
			getInstancesPath().then(v => fs.createDir(v, { recursive: true }))
			return []
		})
}

export const instanceExists = async (instanceName: string) => {
	return fs.exists(await getInstancePath(instanceName))
}

// Game options

export const openInFileManager = async (instanceName: string) => {
	const fpath = await getInstancePath(instanceName)
	const platform = await os.platform()
	console.log(fpath, platform)
	if (platform == 'win32') new shell.Command('explorer', fpath).execute()
	else if (platform == 'linux') new shell.Command('xdg-open', fpath).execute()
}

// Run

export const runGame = async (instanceName: string) => {
	const platform = await os.platform()
	const instancePath = await getInstancePath(instanceName).then(v =>
		path.join(v, 'game')
	)

	const executable = (
		await getFilesByExtension(
			instancePath,
			platform == 'win32' ? '.exe' : '.AppImage'
		)
	).shift()
	if (!executable) return console.error('No game executable found!')
	if (platform == 'linux')
		await new shell.Command('chmod', ['+x', executable.path]).execute()
	invoke('run_game', {
		executable: executable.path,
		instance_path: instancePath,
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

export interface InstanceData {
	name: string
	gameVersion: string
	icon: string // Можно назначить кастомную иконку ы
	runParameters: string // И аргументы для запуска свои
	platform: string // Если придётся таскать папку с инстансами по компам, поможет. Можно тупа не отображать эту версию, либо докачать саму игру под нужную платформу.
	options: any // Можно менять непосредственно этот тип и добавить ещё параметры, но думаю пока норм.
}
