import Form from './components/Form'
import { discordPresence } from '../../utils/discordRPC'
import { useEffect, useState } from 'react'
import SuccessModal from '../../modals/SuccessModal'
import { useSettingsContext } from '../../contexts/SettingsProvider'

export default function NewInstancePage() {
	console.log('NewInstacePage Render')

	const settingsContext = useSettingsContext()

	useEffect(() => {
		discordPresence(
			settingsContext.translation.translatable(
				'newInstancePage.discordPresence.title'
			)
		)
	}, [])

	const [modalActive, setModalActive] = useState<boolean>(false)

	return (
		<>
			<Form setModalActive={setModalActive} />
			<SuccessModal
				active={modalActive}
				title={settingsContext.translation.translatable('newInstancePage.instanceCreated.title') + '! 🥳'}
				btnTitle={settingsContext.translation.translatable('newInstancePage.instanceCreated.buttons.instances')}
				btnLink='/instances'
			/>
		</>
	)
}
