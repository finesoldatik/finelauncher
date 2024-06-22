import Mods from './components/Mods'
import { discordPresence } from '../../utils/discordRPC'
import { useEffect } from 'react'
import { useSettingsContext } from '../../contexts/SettingsProvider'

export default function ModsPage() {
	console.log('ModsPage Render')

	const settingsContext = useSettingsContext()

	useEffect(() => {
		discordPresence(
			settingsContext.translation.translatable('modsPage.discordPresence.title')
		)
	}, [])

	return <Mods settingsContext={settingsContext} />
}
