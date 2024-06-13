import Settings from './components/Settings/index.tsx'
import { discordPresence } from '../../utils/discordRPC'

export default function SettingsPage() {
	console.log('SettingsPage Render')
  discordPresence("Ковыряется в настройках");

	return <Settings />
}
