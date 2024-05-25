import ReactDOM from 'react-dom/client'
import Router from './Router'
import './index.scss'
import { SettingsProvider } from './contexts/SettingsProvider'
import { invoke } from '@tauri-apps/api/tauri'
import { GameProvider } from './contexts/GameProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<SettingsProvider>
		<GameProvider>
			<Router />
		</GameProvider>
	</SettingsProvider>
)

document.addEventListener('DOMContentLoaded', async () => {
	invoke('close_splashscreen')
})
