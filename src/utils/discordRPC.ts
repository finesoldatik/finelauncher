import { invoke } from '@tauri-apps/api'

export const StartPresence = () => {
	return invoke('presence')
}
