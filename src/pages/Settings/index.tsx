import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Theme from '../../components/Theme'
import { themes } from '../../constants'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import * as DiscordRPC from '../../services/discordRPC'

export default function Settings() {
	const settingsContext = useSettingsContext()

	const [RPCConnected, setRPCConnected] = useState(false)

	useEffect(() => {
		DiscordRPC.isConnected().then(val => {
			setRPCConnected(val)
			if (val) DiscordRPC.update('Копается в настройках ✨')
		})
	}, [])

	return (
		<div className='h-screen w-full flex flex-col justify-between'>
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
							DiscordRPC.reconnect().then(val =>
								DiscordRPC.update('Копается в настройках ✨')
							)
						}
					>
						<FontAwesomeIcon
							icon={faCircle}
							className={`${RPCConnected ? 'text-success' : 'text-neutral'}`}
						/>
						Reconnect Discord Presence
					</div>
				</div>
			</div>
		</div>
	)
}
