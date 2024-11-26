import Theme from '../../components/Theme'
import { themes } from '../../constants'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect, useRef, useState } from 'react'
import * as DiscordRPC from '../../services/discordRPC'
import ConfirmModal from '../../components/generic/ConfirmModal'
import Toggle from '../../components/generic/Toggle'

export default function Settings() {
	const settingsContext = useSettingsContext()

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const snowflakeCountInputRef = useRef<HTMLInputElement>(null)

	useEffect(() => {
		DiscordRPC.isConnected().then(val => {
			if (val)
				DiscordRPC.update(
					settingsContext.translation.translatable('settingsPage.DiscordRPC')
				)
		})
	}, [])

	return (
		<div className='relative w-full h-screen flex flex-col justify-between'>
			<div>
				<div className='flex flex-row flex-wrap gap-3 p-10'>
					{themes.map(val => (
						<Theme
							name={val}
							activeTheme={settingsContext.theme}
							setTheme={settingsContext.setTheme}
							key={val}
						/>
					))}
				</div>
				<div className='flex flex-col gap-2 p-10 items-center'>
					<div className='w-2/3 h-full flex flex-col gap-2'>
						<Toggle
							title='Скрывать лаунчер при запуске игры'
							isOn={settingsContext.hideLauncherOnLaunchGame}
							onToggle={() =>
								settingsContext.setHideLauncherOnLaunchGame(prev => !prev)
							}
						/>
						<Toggle
							title='Падение снежинок'
							isOn={settingsContext.fallingSnowflakes}
							onToggle={() =>
								settingsContext.setFallingSnowflakes(prev => !prev)
							}
						/>
						<div
							className={`join join-horizontal ${
								!settingsContext.fallingSnowflakes ? 'hidden' : ''
							}`}
						>
							<input
								type='number'
								min='100'
								max='1000'
								step='100'
								defaultValue={settingsContext.snowflakeCount}
								placeholder='Число снежинок (по умолчанию 300)'
								className='join-item input input-sm input-bordered w-full max-w-xs'
								ref={snowflakeCountInputRef}
							/>
							<div
								className='join-item btn btn-sm btn-neutral'
								onClick={() => {
									if (snowflakeCountInputRef.current) {
										if (snowflakeCountInputRef.current.value.length > 4) {
											snowflakeCountInputRef.current.value = '1000'
										} else if (
											snowflakeCountInputRef.current.value.length < 3
										) {
											snowflakeCountInputRef.current.value = '100'
										} else {
											settingsContext.setSnowflakeCount(
												Number(snowflakeCountInputRef.current.value)
											)
											window.location.reload()
										}
									}
								}}
							>
								Установить
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='sticky bottom-0 w-full flex flex-row justify-between px-2 py-1'>
				<div>
					<div
						className='btn btn-error btn-sm'
						onClick={() => {
							setIsModalOpen(true)
						}}
					>
						Сбросить настройки
					</div>
					<ConfirmModal
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						onConfirm={() => {
							settingsContext.resetSettings()
							window.location.reload()
						}}
					/>
				</div>
				<div>
					<div
						className='btn btn-sm hover:bg-[#5161F1] bg-[#5865F2] border-[#5865F2] text-gray-100'
						onClick={() =>
							DiscordRPC.reconnect().then(() =>
								DiscordRPC.update(
									settingsContext.translation.translatable(
										'settingsPage.DiscordRPC'
									)
								)
							)
						}
					>
						Reconnect Discord Presence
					</div>
				</div>
			</div>
		</div>
	)
}
