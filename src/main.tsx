import ReactDOM from 'react-dom/client'
import Router from './Router'
import './index.css'
import SettingsProvider from './contexts/SettingsProvider'
import GameProvider from './contexts/GameProvider'
import { ReactQueryProvider } from './contexts/ReactQueryProvider'
import AlertProvider from './contexts/AlertProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<SettingsProvider>
		<GameProvider>
			<ReactQueryProvider>
				<AlertProvider>
					<Router />
				</AlertProvider>
			</ReactQueryProvider>
		</GameProvider>
	</SettingsProvider>
)
