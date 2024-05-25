import { IPlayButtonProps } from './PlayButton.interface'
import styles from './PlayButton.module.scss'
import { FC, memo } from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { useSettingsContext } from '../../../../../../contexts/SettingsProvider'
import { useGameContext } from '../../../../../../contexts/GameProvider'

const PlayButton: FC<IPlayButtonProps> = memo(({ name }) => {
	console.log('PlayButton Render')

	const settingsContext = useSettingsContext()
	const gameContext = useGameContext()

	return (
		<button
			className={`black-style green-bg ${styles['play-btn']}`}
			onClick={() => {
				if (settingsContext.settings.hideLauncherOnLaunchGame)
					appWindow.minimize()
				console.log(
					'hideLauncherOnLaunchGame: ',
					settingsContext.settings.hideLauncherOnLaunchGame
				)
				gameContext.startGame(name)
			}}
		>
			Играть
		</button>
	)
})

export default PlayButton
