import Instances from './components/Instances'
import { discordPresence } from '../../utils/discordRPC'

export default function InstancesPage() {
	console.log('InstancesPage Render')
  discordPresence("Выбирает сборку");

	return <Instances />
}
