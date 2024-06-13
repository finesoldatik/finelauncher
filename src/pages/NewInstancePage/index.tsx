import Form from "./components/Form";
import { discordPresence } from '../../utils/discordRPC'

export default function NewInstancePage() {
  discordPresence("Создает новую сборку");

	return (
		<Form />
	)
}
