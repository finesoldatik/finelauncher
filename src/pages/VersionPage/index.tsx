import { useParams } from 'react-router-dom'
import styles from './VersionPage.module.scss'
import { FC, useEffect, useMemo, useState } from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import Console from './components/Console'
import ButtonContainer from './components/ButtonContainer'

const VersionPage: FC = () => {
	const params = useParams()
	const version: string = String(params.version)
	const name: string = String(params.name)

	console.log('VersionPage Render')

	const settingsContext = useSettingsContext()
	const [pid, setPid] = useState<number | null>(settingsContext.gameData.pid)
	const [logs, setLogs] = useState<string[]>(settingsContext.gameData.logs)

	useEffect(() => {
		setPid(settingsContext.gameData.pid)
	}, [settingsContext.gameData.pid])

	useEffect(() => {
		setLogs(settingsContext.gameData.logs)
	}, [settingsContext.gameData.logs])

	useEffect(() => {
		const unSubscribeLog = listen('log_message', event => {
			console.log('Событие log_message:', event.payload)
			settingsContext.addGameLogs(String(event.payload))
		})

		const unSubscribeStart = listen('game_process_started', event => {
			console.log('Событие game_process_started:', event.payload)
			settingsContext.setGamePid(Number(event.payload))
		})

		const unSubscribeEnd = listen('game_process_ended', event => {
			console.log('Событие game_process_ended:', event.payload)
			settingsContext.stopGame()
			settingsContext.deleteGameLogs()
		})

		return () => {
			unSubscribeLog.then(unsub => unsub())
			unSubscribeStart.then(unsub => unsub())
			unSubscribeEnd.then(unsub => unsub())
		}
	}, [])

	useEffect(() => {
		if (
			settingsContext.gameData.pid === null &&
			settingsContext.settings.hideLauncherOnLaunchGame
		) {
			appWindow.unminimize()
			appWindow.setFocus()
		}
	}, [
		settingsContext.gameData.pid,
		settingsContext.settings.hideLauncherOnLaunchGame,
	])

	let image

	if (version.split(' ')[0] === 'VE') image = '/images/version/ve-512.png'
	else if (version.split(' ')[0] === 'RVE')
		image = '/images/version/rve-512.png'

	return (
		<>
			{pid && <Console logs={logs}></Console>}
			<div className={`black-style ${styles['container']}`}>
				<img
					className={styles['img']}
					src={image}
					width={160}
					height={160}
					alt='image'
				/>
				<h3>Имя версии: {params.name}</h3>
				{useMemo(
					() => (
						<ButtonContainer name={name} />
					),
					[name]
				)}
			</div>
		</>
	)
}

export default VersionPage
