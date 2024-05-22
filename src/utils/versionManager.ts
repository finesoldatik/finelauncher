import { fs, invoke, os, path, shell } from '@tauri-apps/api'
import { Child, Command } from '@tauri-apps/api/shell'

// Util
type normalizeFilename = (filename: string) => string
type getFilesByExtension = (
	path: string,
	ext: string
) => Promise<fs.FileEntry[]>

// Instances path
type getInstancesPath = () => Promise<string>
type getInstancePath = (instanceName: string) => Promise<string>

// Remove/Check
type createInstance = (instanceName: string) => Promise<void>
type removeInstance = (instanceName: string) => Promise<void>
type getInstalledInstances = () => Promise<fs.FileEntry[] | never[]>
type instanceExists = (instanceName: string) => Promise<boolean>

// Game options
type openInFileManager = (instanceName: string) => Promise<void>

// Run
type runGame = (instanceName: string) => Promise<void>
type terminateProcess = (processId: number) => Promise<void>

// Util

export const launcherDirName = 'finelauncher'

export const normalizeFilename: normalizeFilename = (filename: string) => {
	return filename
		.replace(/[\\/:*?"<>|.]/g, '')
		.replace(/\s/g, '-')
		.toLowerCase()
		.substring(0, 240)
}

export const getFilesByExtension: getFilesByExtension = async (path: string, ext: string) => {
	return fs
		.readDir(path)
		.then(files => files.filter(f => f.name?.endsWith(ext)))
}

// Instances path

export const getInstancesPath: getInstancesPath = async () => {
	return path
		.documentDir()
		.then(v => path.join(v, launcherDirName, 'instances'))
}

export const getInstancePath: getInstancePath = async (instanceName: string) => {
	return getInstancesPath().then(v =>
		path.join(v, normalizeFilename(instanceName))
	)
}

// Remove/Check

export const createInstance: createInstance = async (instanceName: string) => {
	return fs
		.createDir(await getInstancePath(instanceName))
		.catch(r => console.log('Error while creating instance directory!', r))
}

export const removeInstance: removeInstance = async (instanceName: string) => {
	fs.removeDir(await getInstancePath(instanceName)).catch(r => {
		console.error('Error while deleting instance directory!', r)
	})
}

export const getInstalledInstances: getInstalledInstances = async () => {
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

export const instanceExists: instanceExists = async (instanceName: string) => {
	return fs.exists(await getInstancePath(instanceName))
}

// Game options

export const openInFileManager: openInFileManager = async (instanceName: string) => {
	const fpath = await getInstancePath(instanceName)
	const platform = await os.platform()
	console.log(fpath, platform)
	if (platform == 'win32') new shell.Command('explorer', fpath).execute()
	else if (platform == 'linux') new shell.Command('xdg-open', fpath).execute()
}

// Run

export const runGame: runGame = async (instanceName: string) => {
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
		await new Command('chmod', ['+x', executable.path]).execute()
	invoke('run_game', {
		executable: executable.path,
		instance_path: instancePath,
	})
}

export const terminateProcess: terminateProcess = async (processId: number) => {
	new Child(processId).kill()
}
