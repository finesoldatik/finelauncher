import { FC } from 'react'
import styles from './StopButton.module.scss'
import { useSettingsContext } from '../../../../../../contexts/SettingsProvider'

const StopButton: FC = () => {
	const settingsContext = useSettingsContext()

	console.log('StopButton Render')

	return (
		<button
			className={`black-style red-bg no-boundary-radius ${styles['btn']}`}
			onClick={() => {
				settingsContext.terminateGame(Number(settingsContext.gameData.pid))
			}}
		>
			Остановить игру
		</button>
	)
}

export default StopButton
