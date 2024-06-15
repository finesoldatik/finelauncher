import Mods from './components/Mods'
import { discordPresence } from '../../utils/discordRPC'

export default function ModsPage() {
	console.log('ModsPage Render')
	discordPresence('Выбирает моды')

	return <Mods />
}
