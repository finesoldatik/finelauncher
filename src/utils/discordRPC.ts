import { invoke } from '@tauri-apps/api'

export const discordPresence = async (message: string) => {
	return invoke('discord_presence', { message })
}

export const reconnectDiscordRPC = async () => {
	return invoke('reconnect_discord', {})
}
