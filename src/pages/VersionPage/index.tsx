import { useNavigate, useParams } from 'react-router-dom'
import styles from './VersionPage.module.scss'
import { FC, useEffect, useState } from 'react'
import { appWindow } from '@tauri-apps/api/window'
import { listen } from '@tauri-apps/api/event'
import Console from './components/Console'
import ButtonContainer from './components/ButtonContainer'
import { useGameContext } from '../../contexts/GameProvider'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { getInstancePath } from '../../utils/versionManager'
import { fs, path } from '@tauri-apps/api'
import PlayButton from './components/PlayButton'
import Mod from './components/Mod'

const VersionPage: FC = () => {
	console.log('VersionPage Render')

	const params = useParams()
	const version: string = String(params.version)
	const name: string = String(params.name)

	const navigate = useNavigate()

	const gameContext = useGameContext()
	const settingsContext = useSettingsContext()

	const [mods, setMods] = useState<string[]>([])

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

	useEffect(() => {
		getInstancePath(name).then(async value => {
			const content = await fs.readDir(await path.join(value, 'game/content'))
			setMods(content.map(value => String(value.name)))
		})
	}, [])

	return (
		<>
			{gameContext.gameData.gamePID && <Console></Console>}
			<div className={styles['container']}>
				<div className={styles['top-container']}>
					<div
						className={`black-style no-selectable ${styles['info-container']}`}
					>
						<h3>Информация</h3>
						<div className={styles['image-container']}>
							<img
								className={styles['img']}
								src={image}
								width={160}
								height={160}
								alt='image'
							/>
						</div>
						<h4>Имя версии: {params.name}</h4>
						<h4>Версия: VE v12</h4>
					</div>
					<div
						className={`black-style no-boundary-radius no-selectable ${styles['control-container']}`}
					>
						<h3>Управление</h3>
						<div className={styles['control']}>
							<ButtonContainer name={name} />
							<PlayButton name={name} />
						</div>
					</div>
				</div>
				<div
					className={`black-style no-boundary-radius no-selectable ${styles['mods-container']}`}
				>
					<h3>Модификации</h3>
					<div className={styles['mods']}>
						{mods.length > 1 ? (
							mods.map((value, idx) => {
								console.log(mods)
								if (value !== 'temp_dir')
									return (
										<Mod
											version={name}
											modName={value}
											mods={mods}
											setMods={setMods}
											key={idx}
										/>
									)
								else console.log('temp_dir is skipped')
							})
						) : (
							<div className={styles['empty-mods']}>
								<p>
									Похоже, что в вашей версии нет модификаций, давайте добавим
									их?
								</p>
								<button
									className='black-style green-bg'
									onClick={() => navigate('/mods')}
								>
									Искать модификации
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default VersionPage
