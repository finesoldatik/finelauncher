import { useParams } from 'react-router-dom'
import api from '../../api.ts'
import styles from './VersionPage.module.scss'
import { FC, useEffect, useState } from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'

const VersionPage: FC = () => {
	const params = useParams()
	const version: string = String(params.version)
	const name: string = String(params.name)

	console.log(params)

	const [gameProcessPid, setGameProcessPid] = useState<number | undefined>(
		undefined
	)
	const [gameProcessEnded, setGameProcessEnded] = useState<boolean>(false)

	useEffect(() => {
		const unSubscribeLog = listen('log_message', event => {
			console.log('Событие log_message:', event.payload)
		})

		const unSubscribeStart = listen('game_process_started', event => {
			console.log('Событие game_process_started:', event.payload)
			setGameProcessPid(Number(event.payload))
			setGameProcessEnded(false)
		})

		const unSubscribeEnd = listen('game_process_ended', event => {
			console.log('Событие game_process_ended:', event.payload)
			setGameProcessEnded(true)
		})

		return () => {
			unSubscribeLog.then(unsub => unsub())
			unSubscribeStart.then(unsub => unsub())
			unSubscribeEnd.then(unsub => unsub())
		}
	}, [])

	useEffect(() => {
		if (gameProcessEnded) {
			appWindow.unminimize()
			appWindow.setFocus()
		}
	}, [gameProcessEnded])

	let image

	if (version.split(' ')[0] === 'VE') image = '/images/ve-512.png'
	else if (version.split(' ')[0] === 'RVE') image = '/images/rve-512.png'

	return (
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
					onClick={() => api.ShowInFolder(name)}
				>
					Открыть в проводнике
				</button>
				{gameProcessEnded ? (
					<button
						className={'black-style green-bg ' + styles['play-btn']}
						onClick={() => {
							appWindow.minimize()
							api.runGame(name)
						}}
					>
						Играть
					</button>
				) : (
					<button
						className={'black-style red-bg ' + styles['play-btn']}
						onClick={() => {
							api.terminateGame(Number(gameProcessPid))
							setGameProcessEnded(false)
							setGameProcessPid(undefined)
						}}
					>
						Остановить игру
					</button>
				)}
			</div>
		</div>
	)
}

export default VersionPage
