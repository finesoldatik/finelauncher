import Form from './components/Form'
import { discordPresence } from '../../utils/discordRPC'

export default function NewInstancePage() {
	console.log('NewInstacePage Render')
	discordPresence('Создает новый инстанс')

	return <Form />
}
