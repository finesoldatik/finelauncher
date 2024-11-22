import { invoke } from '@tauri-apps/api/core'

export const update = async (state: string, small_image: string = 've') => {
	return invoke('discord_presence', {
		state,
		small_image,
	})
}

export const isConnected = async (): Promise<boolean> => {
	return invoke('is_connected', {})
}

export const reconnect = async () => {
	return invoke('reconnect_discord', {})
}
