import ReactDOM from 'react-dom/client'
import Router from './Router'
import './index.scss'
import { SettingsProvider } from './contexts/SettingsProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<SettingsProvider>
		<Router />
	</SettingsProvider>
)
