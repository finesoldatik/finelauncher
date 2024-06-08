import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
	InstanceData,
	getInstanceData,
	getInstancePath,
	openInFileManager,
} from '../../utils/instanceManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons'
import { appWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'
import { useGameContext } from '../../contexts/GameProvider'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { fs } from '@tauri-apps/api'
import path from 'path'
import { deleteInstance, deleteMod } from '../../utils/download'

export default function InstancePage() {
	console.log('InstancePage Render')

	const params = useParams<{ name: string }>()

	const [data, setData] = useState<InstanceData>()

	const navigate = useNavigate()

	const gameContext = useGameContext()
	const settingsContext = useSettingsContext()

	const [mods, setMods] = useState<string[]>([])

	useEffect(() => {
		getInstanceData(String(params.name)).then(value => {
			setData(value)
		})
	}, [])

	useEffect(() => {
		const unSubscribeLog = listen('log_message', event => {
			// console.log('Событие log_message:', event.payload)
			gameContext.addGameLogs(String(event.payload))
		})

		const unSubscribeStart = listen('game_process_started', event => {
			// console.log('Событие game_process_started:', event.payload)
			gameContext.deleteGameLogs()
			gameContext.setGamePId(Number(event.payload))
		})
		const unSubscribeEnd = listen('game_process_ended', event => {
			// console.log('Событие game_process_ended:', event.payload)
			console.log(event)
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
			gameContext.gameData.gamePId === null &&
			settingsContext.settings.hideLauncherOnLaunchGame
		) {
			appWindow.unminimize()
			appWindow.setFocus()
		}
	}, [
		gameContext.gameData.gamePId,
		settingsContext.settings.hideLauncherOnLaunchGame,
	])

	useEffect(() => {
		getInstancePath(String(params.name)).then(async value => {
			const content = await fs.readDir(await path.join(value, 'game/content'))
			setMods(content.map(value => String(value.name)))
		})
	}, [])

	return (
		<div className='h-full'>
			<div className='flex flex-row bg-base-300 p-2 h-[calc(100%-74%)]'>
				<img height={160} src={data?.icon} alt='version icon' />
				<div className='flex items-center ml-2 text-xl'>
					<div>
						<h1>Имя: {params.name}</h1>
						<h1>Версия: {data?.gameVersion}</h1>
					</div>
				</div>
			</div>
			<div className='bg-base-200 p-3 h-[calc(100%-36%)]'>
				<div className='flex flex-row justify-between'>
					<h1 className='text-2xl ml-2 mt-1'>Моды</h1>
					<div>
						<div className='join rounded-none rounded-l-lg'>
							<div
								className='btn join-item bg-base-100'
								onClick={() => openInFileManager(String(params.name))}
							>
								Открыть в проводнике
							</div>
							<div
								className='btn join-item bg-base-100'
								onClick={() => console.log('Ещё не готово')}
							>
								<FontAwesomeIcon icon={faGear} />
							</div>
							<div
								className='btn btn-error join-item'
								onClick={() =>
									deleteInstance(String(params.name)).then(() => {
										navigate('/instances')
									})
								}
							>
								<FontAwesomeIcon icon={faTrash} />
							</div>
						</div>
					</div>
				</div>
				<div className='h-[calc(100%-15%)] overflow-y-auto'>
					{mods.length > 1 ? (
						mods.map((value, idx) => {
							console.log(mods)
							if (value !== 'temp_dir')
								return (
									<div
										className='flex bg-base-100 mx-2 my-1 justify-between rounded-lg'
										key={idx}
									>
										<h1 className='text-lg mt-2 ml-2'>Название мода</h1>
										<div
											className='btn btn-error'
											onClick={async () => {
												deleteMod(String(params.name), value)
												setMods(mods.filter(val => val !== value))
											}}
										>
											<FontAwesomeIcon icon={faTrash} />
										</div>
									</div>
								)
							else console.log('temp_dir is skipped')
						})
					) : (
						<p>
							Здесь пусто, давайте{' '}
							<Link to={'/mods'} className='link link-primary'>
								добавим парочку модов
							</Link>
						</p>
					)}
				</div>
			</div>
			<div className='flex justify-end items-end h-[calc(100%-90%)]'>
				<div
					className='btn btn-success w-56'
					onClick={() => {
						if (settingsContext.settings.hideLauncherOnLaunchGame)
							appWindow.minimize()
						console.log(
							'hideLauncherOnLaunchGame: ',
							settingsContext.settings.hideLauncherOnLaunchGame
						)
						gameContext.startGame(String(params.name))
					}}
				>
					Играть
				</div>
			</div>
		</div>
	)
}
