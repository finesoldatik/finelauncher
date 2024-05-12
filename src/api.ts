import { invoke } from '@tauri-apps/api/tauri'
import { BaseDirectory, FileEntry, readDir } from '@tauri-apps/api/fs'

type installVersion = (url: string, name: string) => Promise<never>
type runVersion = (version: string) => void
type openDirOfVersion = (version: string) => void
type checkVersion = (version: string) => Promise<boolean>
type getLauncherPath = () => Promise<string>
type getInstalledVersions = () => Promise<FileEntry[]>

// Устанавливаем версию
const installVersion: installVersion = async (url: string, name: string) =>
	await invoke('download_version', { url, name })

// Запускаем версию
const runVersion: runVersion = async (version: string) =>
	await invoke('run_version', { version })

// Открываем папку с версией
const openDirOfVersion: openDirOfVersion = async (version: string) =>
	await invoke('open_directory', { version })

// Проверяем наличие версии
const checkVersion: checkVersion = async (version: string) =>
	await invoke('version_exists', { version })

const getLauncherPath: getLauncherPath = async () => await invoke('get_launcher_path')

const getInstalledVersions: getInstalledVersions = async () =>
	await readDir('finelauncher\\versions', {
		dir: BaseDirectory.Document,
		recursive: true,
	})

export default {
	installVersion,
	runVersion,
	checkVersion,
	openDirOfVersion,
	getLauncherPath,
	getInstalledVersions,
}
