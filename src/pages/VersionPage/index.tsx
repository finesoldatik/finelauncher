import { useParams } from 'react-router-dom'
import { ShowInFolder } from '../../utils/invokes.ts'
import styles from './VersionPage.module.scss'
import { FC, useEffect, useState } from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'
import { useSettingsContext } from '../../contexts/SettingsProvider.tsx'
import Console from './components/Console/index.tsx'

const VersionPage: FC = () => {
	const params = useParams()
	const version: string = String(params.version)
	const name: string = String(params.name)

	const settingsContext = useSettingsContext()
	const [gameLogs, setGameLogs] = useState<Array<string>>([])

	useEffect(() => {
		const unSubscribeLog = listen('log_message', event => {
			console.log('Событие log_message:', event.payload)
			setGameLogs(prev => [...prev, String(event.payload)])
			console.log('gameLogs:', gameLogs)
		})

		const unSubscribeStart = listen('game_process_started', event => {
			console.log('Событие game_process_started:', event.payload)
			settingsContext.setGamePid(Number(event.payload))
		})

		const unSubscribeEnd = listen('game_process_ended', event => {
			console.log('Событие game_process_ended:', event.payload)
			settingsContext.stopGame()
			setGameLogs([])
		})

		return () => {
			unSubscribeLog.then(unsub => unsub())
			unSubscribeStart.then(unsub => unsub())
			unSubscribeEnd.then(unsub => unsub())
		}
	}, [])

	useEffect(() => {
		if (
			settingsContext.gamePid === null &&
			settingsContext.hideLauncherOnLaunchGame
		) {
			appWindow.unminimize()
			appWindow.setFocus()
		}
	}, [settingsContext.gamePid, settingsContext.hideLauncherOnLaunchGame])

	let image

	if (version.split(' ')[0] === 'VE') image = '/images/ve-512.png'
	else if (version.split(' ')[0] === 'RVE') image = '/images/rve-512.png'

	return (
		<>
			{settingsContext.gamePid && <Console logs={gameLogs}></Console>}
			<div className={'black-style ' + styles['container']}>
				<img
					className={styles['img']}
					src={image}
					width={160}
					height={160}
					alt='image'
				/>
				<h3>Имя версии: {params.name}</h3>
				<div className={styles['btn-container']}>
					<button
						className={'black-style ' + styles['opendir-btn']}
						onClick={() => ShowInFolder(name)}
					>
						Открыть в проводнике
					</button>
					<button
						className={'black-style green-bg ' + styles['play-btn']}
						onClick={() => {
							if (settingsContext.hideLauncherOnLaunchGame) appWindow.minimize()
							console.log(settingsContext.hideLauncherOnLaunchGame)
							settingsContext.startGame(name)
						}}
					>
						Играть
					</button>
				</div>
			</div>
		</>
	)
}

export default VersionPage
