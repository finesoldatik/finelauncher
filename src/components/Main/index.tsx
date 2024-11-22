import { Link } from 'react-router-dom'
import icon from '../../assets/images/icon.png'
import veBg from '../../assets/images/ve/bg.png'
import { darkThemes, launcherDiscord, launcherGithub } from '../../constants'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect } from 'react'
import * as DiscordRPC from '../../services/discordRPC'

export default function Main() {
	const settingsContext = useSettingsContext()

	useEffect(() => {
		DiscordRPC.isConnected().then(val => {
			if (val)
				DiscordRPC.update(
					settingsContext.translation.translatable('instancesPage.Main')
				)
		})
	}, [])

	return (
		<div
			className='w-full h-screen flex relative bg-cover bg-no-repeat bg-center'
			style={{ backgroundImage: `url(${veBg})` }}
		>
			<div
				className={`w-full h-full flex flex-col justify-between bg-black ${
					darkThemes.includes(settingsContext.theme)
						? 'bg-opacity-50'
						: 'bg-opacity-30'
				}`}
			>
				<div className='w-full h-full flex justify-center items-center'>
					<img className='h-48 w-48 rounded-3xl' src={icon} alt='icon' />
				</div>

				<div className='w-full flex flex-row justify-between px-2 py-1'>
					<div>
						<h1 className='font-extrabold text-2xl text-gray-100'>
							finelauncher:)
						</h1>
						<h3 className='italic font-medium text-sm text-gray-100'>
							Чтобы начать игру, просто выбери сборку в меню слева.
						</h3>
					</div>
					<div className='flex flex-row gap-1.5 items-end'>
						<Link
							to={launcherDiscord}
							target='_blank'
							className='btn btn-outline btn-sm hover:bg-[#5161F1] hover:border-[#5865F2] text-gray-100 border-[#5865F2]'
						>
							Discord
						</Link>

						<Link
							to={launcherGithub}
							target='_blank'
							className='btn btn-outline btn-sm hover:bg-[#24292E] hover:border-[#24292E] text-gray-100 hover:text-gray-200 border-[#24292E]'
						>
							Github
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
