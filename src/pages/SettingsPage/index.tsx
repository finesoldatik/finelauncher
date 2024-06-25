import Settings from './components/Settings/index.tsx'
import { discordPresence } from '../../utils/discordRPC'
import { useEffect } from 'react'
import { useSettingsContext } from '../../contexts/SettingsProvider.tsx'

export default function SettingsPage() {
	console.log('SettingsPage Render')

	const settingsContext = useSettingsContext()

	useEffect(() => {
		discordPresence(
			settingsContext.translation.translatable(
				'settingsPage.discordPresence.title'
			)
		)
	}, [])

	return <Settings />
}
