import ReactDOM from 'react-dom/client'
import Router from './Router'
import './index.scss'
import { invoke } from '@tauri-apps/api/tauri'
import { SettingsProvider } from './contexts/SettingsProvider'
import { GameProvider } from './contexts/GameProvider'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
	<SettingsProvider>
		<GameProvider>
			<QueryClientProvider client={queryClient}>
				<Router />
			</QueryClientProvider>
		</GameProvider>
	</SettingsProvider>
)

document.addEventListener('DOMContentLoaded', async () => {
	invoke('close_splashscreen')
})
