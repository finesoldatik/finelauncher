import { FC, useEffect, useState } from 'react'
import { useGameContext } from '../../../../contexts/GameProvider'
import { ISettingsContext } from '../../../../contexts/SettingsProvider'
import { appWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'

interface IPlayPanelProps {
	settingsContext: ISettingsContext
	name: string
}

const PlayPanel: FC<IPlayPanelProps> = ({ settingsContext, name }) => {
	console.log('PlayPanel Render')

	const [progress, setProgress] = useState<number>(0)

	const gameContext = useGameContext()

	useEffect(() => {
		const unSubscribeProgress = listen('build_progress', event => {
			console.log('Событие build_process:', event.payload)
			setProgress(Number(event.payload))
		})
		const unSubscribeStart = listen('game_process_started', event => {
			console.log('Событие game_process_started:', event.payload)
			gameContext.deleteGameLogs()
			gameContext.setGamePid(Number(event.payload))
		})
		const unSubscribeEnd = listen('game_process_ended', event => {
			console.log('Событие game_process_ended:', event.payload)
			gameContext.stopGame()
			gameContext.deleteGameLogs()
		})

		return () => {
			unSubscribeProgress.then(unsub => unsub())
			unSubscribeStart.then(unsub => unsub())
			unSubscribeEnd.then(unsub => unsub())
		}
	}, [])

	useEffect(() => {
		if (gameContext.pid === null && settingsContext.hideLauncherOnLaunchGame) {
			appWindow.unminimize()
			appWindow.setFocus()
		}
	}, [gameContext.pid, settingsContext.hideLauncherOnLaunchGame])

	return (
		<div className='flex justify-end items-end h-[calc(100%-90%)]'>
			<progress
				className='progress progress-success m-2'
				value={progress}
				max='100'
			></progress>
			<div
				className='btn btn-success w-56'
				onClick={() => {
					if (settingsContext.hideLauncherOnLaunchGame) appWindow.minimize()
					console.log(
						'hideLauncherOnLaunchGame: ',
						settingsContext.hideLauncherOnLaunchGame
					)
					gameContext.startGame(String(name))
				}}
			>
				{settingsContext.translation.translatable(
					'instancePage.playPanel.buttons.play'
				)}
			</div>
		</div>
	)
}

export default PlayPanel
