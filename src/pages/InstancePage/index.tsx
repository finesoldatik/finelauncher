import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
	InstanceData,
	deleteInstance,
	getInstalledInstances,
	getInstanceContent,
	getInstanceData,
	instanceExists,
	openInFileManager,
} from '../../utils/instanceManager'
import { listen } from '@tauri-apps/api/event'
import { useGameContext } from '../../contexts/GameProvider'
import { discordPresence } from '../../utils/discordRPC'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCube,
	faFolder,
	faGear,
	faStar,
	faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { appWindow } from '@tauri-apps/api/window'
import { IVersion } from '../../utils/version'
import { deleteMod } from '../../utils/mod'

export interface IVersionDisplay {
	name: string
	version: IVersion
	image: string
}

export default function InstancePage() {
	console.log('InstancePage Render')

	const settingsContext = useSettingsContext()

	const params = useParams<{ name: string }>()

	const [data, setData] = useState<InstanceData>()

	const [exists, setExists] = useState<boolean>(false)

	const gameContext = useGameContext()

	const [loading, setLoading] = useState<boolean>(true)

	const [instances, setInstances] = useState<(IVersionDisplay | undefined)[]>(
		[]
	)

	const navigate = useNavigate()

	const [firstRun, setFirstRun] = useState<Date>()
	const [lastRun, setLastRun] = useState<Date>()

	useEffect(() => {
		discordPresence(
			settingsContext.translation.translatable(
				'instancePage.discordPresence.title'
			)
		)
	}, [settingsContext.translation])

	useEffect(() => {
		getInstanceData(String(params.name)).then(data => setData(data))

		instanceExists(String(params.name)).then(val => setExists(val))

		getInstanceContent(String(params.name)).then(content => {
			setMods(
				content
					.map(mod => String(mod.name))
					.filter(value => value != 'temp_dir')
			)
		})

		const loadInstances = async () => {
			setLoading(true)
			const installedInstances = await getInstalledInstances()
			Promise.all(
				installedInstances.map(async instance => {
					if (
						instance.children?.find(value => {
							return value.name === 'instance.json'
						}) &&
						instance.name
					) {
						const instanceData = await getInstanceData(String(instance.name))
						return {
							name: instanceData.name,
							version: instanceData.version,
							image: instanceData.icon,
						}
					}
				})
			).then(value => {
				const filtered = value.filter(val => val !== undefined)
				console.log(filtered)

				setInstances(filtered)
				setLoading(false)
			})
		}
		loadInstances()
	}, [params.name])

	// позже это вынести надо в компонент с консолью
	useEffect(() => {
		const unSubscribeLog = listen('log_message', event => {
			console.log('Событие log_message:', event.payload)
			gameContext.addGameLogs(String(event.payload))
		})
		const unSubscribeStart = listen('game_process_started', event => {
			console.log('Событие game_process_started:', event.payload)
			gameContext.deleteGameLogs()
			gameContext.setGamePid(Number(event.payload))
			if (settingsContext.hideLauncherOnLaunchGame) appWindow.minimize()
			const runDate = new Date()
			if (!firstRun) setFirstRun(runDate)
			setLastRun(runDate)
		})
		const unSubscribeEnd = listen('game_process_ended', event => {
			console.log('Событие game_process_ended:', event.payload)
			gameContext.stopGame()
			gameContext.deleteGameLogs()
			if (settingsContext.hideLauncherOnLaunchGame) {
				appWindow.unminimize()
				appWindow.setFocus()
			}
		})

		return () => {
			unSubscribeLog.then(unsub => unsub())
			unSubscribeStart.then(unsub => unsub())
			unSubscribeEnd.then(unsub => unsub())
		}
	}, [gameContext, settingsContext.hideLauncherOnLaunchGame])

	useEffect(() => {
		if (gameContext.pid === null && settingsContext.hideLauncherOnLaunchGame) {
			appWindow.unminimize()
			appWindow.setFocus()
		}
	}, [gameContext.pid, settingsContext.hideLauncherOnLaunchGame])

	const [mods, setMods] = useState<string[]>([])

	console.log(lastRun)

	return (
		<div className='flex flex-row h-full'>
			<div className='h-full z-10'>
				<ul className='menu menu-md bg-base-200 flex flex-col flex-nowrap w-56 h-full overflow-y-auto gap-2'>
					<li className='btn btn-ghost' onClick={() => navigate('/new-instance')}>Создать инстанс</li>
					{loading ? (
						<div className='w-full h-full flex flex-col justify-center items-center'>
							<span className='loading loading-bars loading-lg'></span>
						</div>
					) : (
						<>
							{instances.map(instance => (
								<li key={instance?.name}>
									<Link to={`/instances/${instance?.name}`}>
										{instance?.name}
									</Link>
								</li>
							))}
						</>
					)}
				</ul>
			</div>
			<div className='h-screen w-full'>
				{exists ? (
					<>
						<div className='flex relative bg-[url("/img/bg/ve.jpg")] bg-cover bg-no-repeat bg-center w-full h-36 blur-sm'></div>
						<div className='flex flex-row absolute z-10 top-0 px-4 py-2 bg-black bg-opacity-40'>
							<img className='h-32' src={data?.icon} alt='version icon' />
							<div className='flex items-center ml-2 text-xl'>
								<div>
									<h1>
										{settingsContext.translation.translatable(
											'instancePage.titleContent.fields.name'
										)}
										: {params.name}
									</h1>
									<h1>
										{settingsContext.translation.translatable(
											'instancePage.titleContent.fields.version'
										)}
										1 : {data?.version.name}
									</h1>
								</div>
							</div>
						</div>
						<div className='relative w-full h-[calc(100%-9rem)] bg-base-300'>
							<div className='flex flex-row'>
								<div
									className='btn btn-success w-48 my-1 rounded-none'
									onClick={() => gameContext.startGame(String(params.name))}
								>
									Играть
								</div>
								<div className='flex flex-row justify-end w-full px-2 py-1 gap-10'>
									<div>
										<p className='font-semibold'>Последний запуск:</p>
										<p className='text-sm'>
											{lastRun
												? lastRun.toLocaleString().replace(', ', ', в ')
												: ''}
										</p>
									</div>
									<div>
										<p className='font-semibold'>Вы играли:</p>
										<p className='text-sm'>
											{firstRun && lastRun
												? firstRun.getMinutes() - lastRun.getMinutes()
												: ''}
										</p>
									</div>
								</div>
								<div className='join flex flex-row justify-end w-full py-1 gap-0.5'>
									<div className='btn btn-neutral join-item'>
										<FontAwesomeIcon icon={faStar} />
									</div>
									<div
										className='btn btn-neutral join-item'
										onClick={() => openInFileManager(String(params.name))}
									>
										<FontAwesomeIcon icon={faFolder} />
									</div>
									<div className='btn btn-neutral join-item'>
										<FontAwesomeIcon icon={faGear} />
									</div>
									<div
										className='btn btn-error join-item'
										onClick={() => {
											deleteInstance(String(params.name))
											navigate('/instances')
										}}
									>
										<FontAwesomeIcon icon={faTrash} />
									</div>
								</div>
							</div>
							<div className='w-full h-[calc(100%-56px)]'>
								<h3 className='px-3 py-1 text-2xl font-semibold'>Моды</h3>
								<div className='overflow-y-auto w-full h-[calc(100%-40px)]'>
									<ul className='menu menu-md bg-base-300 flex flex-col flex-nowrap'>
										{mods.map(mod => (
											<li key={mod}>
												<a className='w-full flex flex-row justify-between'>
													<p>{mod}</p>
													<div
														className='btn btn-error w-12'
														onClick={() => {
															deleteMod(String(params.name), mod)
															setMods(prev =>
																prev.filter(value => value != mod)
															)
														}}
													>
														<FontAwesomeIcon icon={faTrash} />
													</div>
												</a>
											</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className='w-full h-screen flex flex-col justify-center items-center'>
						<h1 className='font-extrabold text-3xl'>
							Выберите инстанс <FontAwesomeIcon icon={faCube} />
						</h1>
					</div>
				)}
			</div>
		</div>
	)
}
