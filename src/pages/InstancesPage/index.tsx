import Instances from './components/Instances'
import { discordPresence } from '../../utils/discordRPC'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect } from 'react'

export default function InstancesPage() {
	console.log('InstancesPage Render')

	const settingsContext = useSettingsContext()

	useEffect(() => {
		discordPresence(
			settingsContext.translation.translatable(
				'instances.discordPresence.title'
			)
		)
	}, [])

	return <Instances />
}
