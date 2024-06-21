import Form from './components/Form'
import { discordPresence } from '../../utils/discordRPC'
import { useState } from 'react'
import SuccessModal from '../../modals/SuccessModal'

export default function NewInstancePage() {
	console.log('NewInstacePage Render')
	discordPresence('Создает новый инстанс')

	const [modalActive, setModalActive] = useState<boolean>(false)

	return (
		<>
			<Form setModalActive={setModalActive} />
			<SuccessModal
				active={modalActive}
				title='Инстанс успешно создан! 🥳'
				btnTitle='Инстансы'
				btnLink='/instances'
			/>
		</>
	)
}
