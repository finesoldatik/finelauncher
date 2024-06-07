import ReactDOM from 'react-dom/client'
import Router from './Router'
import './index.css'
import { SettingsProvider } from './contexts/SettingsProvider'
import { GameProvider } from './contexts/GameProvider'
import { ReactQueryProvider } from './contexts/ReactQueryProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<SettingsProvider>
		<GameProvider>
			<ReactQueryProvider>
				<Router />
			</ReactQueryProvider>
		</GameProvider>
	</SettingsProvider>
)
