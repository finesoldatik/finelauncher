import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router'
import SettingsProvider from './contexts/SettingsProvider'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<SettingsProvider>
			<Router />
		</SettingsProvider>
	</React.StrictMode>
)
