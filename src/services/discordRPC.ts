import { invoke } from '@tauri-apps/api/core'

export const update = async (message: string) => {
	return invoke('discord_presence', { message })
}

export const isConnected = async () => {
	return invoke('is_connected', {})
}

export const reconnect = async () => {
	return invoke('reconnect_discord', {})
}
