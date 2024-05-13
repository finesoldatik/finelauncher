import { invoke } from '@tauri-apps/api/tauri'
import { BaseDirectory, FileEntry, readDir } from '@tauri-apps/api/fs'

import ModWrapper, { ModsConfig } from './utils/mod'
import { setMods } from './components/mod/interface'
import { IMods } from './pages/mods/interface'

type installVersion = (url: string, name: string) => Promise<never>
type runVersion = (version: string) => void
type openDirOfVersion = (version: string) => void
type checkVersion = (version: string) => Promise<boolean>
type getLauncherPath = () => Promise<string>
type getInstalledVersions = () => Promise<FileEntry[]>
type getModsByTag = (
	modWrapper: ModWrapper,
	setMods: setMods,
	tag_id: number[]
) => void
type getModsBySearchQuery = (
	modWrapper: ModWrapper,
	setMods: setMods,
	searchQuery: string
) => void

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

const getLauncherPath: getLauncherPath = async () =>
	await invoke('get_launcher_path')

const getInstalledVersions: getInstalledVersions = async () =>
	await readDir('finelauncher\\versions', {
		dir: BaseDirectory.Document,
		recursive: true,
	})

const getModsByTag: getModsByTag = (
	modWrapper: ModWrapper,
	setMods: setMods,
	tag_id: number[]
) => {
	modWrapper.getMods({ params: { tag_id } }).then(response => {
		console.log(response.data.data)
		setMods(response.data.data)
	})
}

const getModsBySearchQuery: getModsBySearchQuery = (
	modWrapper: ModWrapper,
	setMods: setMods,
	searchQuery: string
) => {
	console.log(searchQuery)
	let config: ModsConfig = { params: { item_count: 1000 } }
	if (searchQuery !== '') config = { params: { title: searchQuery } }
	modWrapper.getMods(config).then(response => {
		if (response.data.data.content.length) setMods(response.data.data)
		else {
			const error: IMods = {}
			setMods(error)
		}
	})
}

export default {
	installVersion,
	runVersion,
	checkVersion,
	openDirOfVersion,
	getLauncherPath,
	getInstalledVersions,
	getModsByTag,
	getModsBySearchQuery,
}
