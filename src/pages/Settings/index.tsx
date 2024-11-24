import Theme from '../../components/Theme'
import { themes } from '../../constants'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect, useState } from 'react'
import * as DiscordRPC from '../../services/discordRPC'

export default function Settings() {
	const settingsContext = useSettingsContext()

	useEffect(() => {
		DiscordRPC.isConnected().then(val => {
			if (val)
				DiscordRPC.update(
					settingsContext.translation.translatable('settingsPage.DiscordRPC')
				)
		})
	}, [])

	return (
		<div className='w-full h-screen flex flex-col justify-between'>
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
			</div>

			<div className='flex flex-row justify-between px-2 py-1'>
				<div>
					<div
						className='btn btn-error btn-sm'
						onClick={() => settingsContext.resetSettings()}
					>
						Сбросить настройки
					</div>
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
