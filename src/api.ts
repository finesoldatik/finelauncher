import { invoke } from '@tauri-apps/api/tauri'
import { listen } from '@tauri-apps/api/event'

// Устанавливаем версию
const installVersion = async (url: string, name: string) =>
	await invoke('download_version', { url, name })

// Запускаем версию
const runVersion = async (version: string) =>
	await invoke('run_version', { version })

// Открываем папку с версией
const openDirOfVersion = async (version: string) =>
	await invoke('open_directory', { version })

// Проверяем наличие версии
const checkVersion = async (version: string) =>
	await invoke('version_exists', { version })

// Подписываемся на событие
const getProgress = async progressBarRef => {
	const unSubscribe = await listen('update-progress', event => {
		console.log('Событие update_process:', event.payload)
		progressBarRef.innerHTML = event.payload.message
	})
	return unSubscribe
}

export default {
	installVersion,
	runVersion,
	checkVersion,
	getProgress,
	openDirOfVersion,
}
