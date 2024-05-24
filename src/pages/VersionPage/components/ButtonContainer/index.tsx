import { FC, memo } from 'react'
import styles from './ButtonContainer.module.scss'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'
import { openInFileManager } from '../../../../utils/versionManager'
import { appWindow } from '@tauri-apps/api/window'

interface IButtonContainer {
	name: string
}

const ButtonContainer: FC<IButtonContainer> = memo(({ name }) => {
	const settingsContext = useSettingsContext()

	console.log('ButtonContainer Render')

	return (
		<div className={styles['container']}>
			<button
				className={`black-style ${styles['opendir-btn']}`}
				onClick={() => openInFileManager(name)}
			>
				Открыть в проводнике
			</button>
			<button
				className={`black-style green-bg ${styles['play-btn']}`}
				onClick={() => {
					if (settingsContext.settings.hideLauncherOnLaunchGame)
						appWindow.minimize()
					console.log(
						'hideLauncherOnLaunchGame: ',
						settingsContext.settings.hideLauncherOnLaunchGame
					)
					settingsContext.startGame(name)
				}}
			>
				Играть
			</button>
		</div>
	)
})

export default ButtonContainer
