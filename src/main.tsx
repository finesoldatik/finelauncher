import ReactDOM from 'react-dom/client'
import Router from './Router'
import './index.scss'
import { SettingsProvider } from './contexts/SettingsProvider'
import { invoke } from '@tauri-apps/api/tauri'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<SettingsProvider>
		<Router />
	</SettingsProvider>
)

document.addEventListener('DOMContentLoaded', () => {
	// This will wait for the window to load, but you could
	// run this function on whatever trigger you want
	invoke('close_splashscreen')
})
