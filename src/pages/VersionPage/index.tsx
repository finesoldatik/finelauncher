import { useParams } from 'react-router-dom'
import styles from './VersionPage.module.scss'
import { FC, useEffect } from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'
import Console from './components/Console'
import ButtonContainer from './components/ButtonContainer'
import { useGameContext } from '../../contexts/GameProvider'
import { useSettingsContext } from '../../contexts/SettingsProvider'

const VersionPage: FC = () => {
	const params = useParams()
	const version: string = String(params.version)
	const name: string = String(params.name)

	console.log('VersionPage Render')

	const gameContext = useGameContext()
	const settingsContext = useSettingsContext()

	useEffect(() => {
		const unSubscribeLog = listen('log_message', event => {
			// console.log('Событие log_message:', event.payload)
			gameContext.addGameLogs(String(event.payload))
		})

		const unSubscribeStart = listen('game_process_started', event => {
			// console.log('Событие game_process_started:', event.payload)
			gameContext.deleteGameLogs()
			gameContext.setGamePID(Number(event.payload))
		})

		const unSubscribeEnd = listen('game_process_ended', event => {
			// console.log('Событие game_process_ended:', event.payload)
			gameContext.stopGame()
			gameContext.deleteGameLogs()
		})

		return () => {
			unSubscribeLog.then(unsub => unsub())
			unSubscribeStart.then(unsub => unsub())
			unSubscribeEnd.then(unsub => unsub())
		}
	}, [])

	useEffect(() => {
		if (
			gameContext.gameData.gamePID === null &&
			settingsContext.settings.hideLauncherOnLaunchGame
		) {
			appWindow.unminimize()
			appWindow.setFocus()
		}
	}, [
		gameContext.gameData.gamePID,
		settingsContext.settings.hideLauncherOnLaunchGame,
	])

	let image

	if (version.split(' ')[0] === 'VE') image = '/images/version/ve-512.png'
	else if (version.split(' ')[0] === 'RVE')
		image = '/images/version/rve-512.png'

	return (
		<>
			{gameContext.gameData.gamePID && <Console></Console>}
			<div className={`black-style ${styles['container']}`}>
				<img
					className={styles['img']}
					src={image}
					width={160}
					height={160}
					alt='image'
				/>
				<h3>Имя версии: {params.name}</h3>
				<ButtonContainer name={name} />
			</div>
		</>
	)
}

export default VersionPage
