import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { SettingsProvider } from './contexts/SettingsProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<SettingsProvider>
		<App />
	</SettingsProvider>
)
