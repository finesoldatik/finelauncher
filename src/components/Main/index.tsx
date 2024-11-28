import { Link } from 'react-router-dom'
import {
	backgrounds,
	darkThemes,
	dayBackgrounds,
	launcherDiscord,
	launcherGithub,
} from '../../constants'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect } from 'react'
import * as DiscordRPC from '../../services/discordRPC'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'

export default function Main() {
	const { state, dispatch } = useSettingsContext()

	useEffect(() => {
		DiscordRPC.isConnected().then(val => {
			if (val)
				DiscordRPC.update(
					state.translation.translatable('instancesPage.DiscordRPC.Main')
				)
		})
	}, [])

	return (
		<div
			className='w-full h-screen flex relative bg-cover bg-no-repeat bg-center transition-all duration-300'
			style={{
				backgroundImage: `url(/images/ve/bg/${state.background}.png)`,
			}}
		>
			<div
				className={`w-full h-full flex flex-col justify-between bg-black ${
					dayBackgrounds.includes(state.background)
						? darkThemes.includes(state.theme)
							? 'bg-opacity-50'
							: 'bg-opacity-30'
						: 'bg-opacity-0'
				}`}
			>
				<div className='fixed top-0 right-0'>
					<div className='dropdown dropdown-left dropdown-hover'>
						<div role='button' className='btn btn-neutral btn-xs'>
							<FontAwesomeIcon icon={faEllipsis} />
						</div>
						<ul className='dropdown-content menu rounded-r-none flex flex-row overflow-y-auto bg-base-100 rounded-box z-[1] w-52 h-56 p-2 shadow'>
							{backgrounds.map(background => (
								<li
									className={`w-full rounded-lg ${
										state.background == background ? 'bg-base-300' : ''
									}`}
									key={background}
									onClick={() =>
										dispatch({ type: 'SET_BACKGROUND', payload: background })
									}
								>
									<a>{background}</a>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className='w-full h-full'></div>

				<div className='w-full xl:w-[1000px] m-auto px-2 py-1 transition-all duration-500'>
					<div className='w-full flex flex-row justify-between px-2 py-1'>
						<div>
							<div className='flex flex-row items-end gap-2'>
								<img
									className='h-12 w-12 rounded-lg'
									src='/images/icon.png'
									alt='icon'
								/>
								<h1 className='font-extrabold text-2xl text-gray-100'>
									finelauncher
								</h1>
							</div>
							<h3 className='italic font-medium text-sm text-gray-100'>
								Чтобы начать игру, просто выбери сборку в меню слева.
							</h3>
						</div>
						<div className='flex flex-row gap-1.5 items-end'>
							<Link
								to={launcherDiscord}
								target='_blank'
								className='btn btn-outline btn-sm btn-neutral'
							>
								Discord
							</Link>

							<Link
								to={launcherGithub}
								target='_blank'
								className='btn btn-outline btn-sm btn-neutral'
							>
								Github
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
