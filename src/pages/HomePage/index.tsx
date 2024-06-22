import BoxesAnimation from '../../components/BoxesAnimation'
import BubblesAnimation from '../../components/BubblesAnimation'
import { Link, useNavigate } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect } from 'react'
import { items } from '../../components/Sidebar/data'
import { discordPresence } from '../../utils/discordRPC'

export default function HomePage() {
	console.log('HomePage Render')

	const navigate = useNavigate()
	const settingsContext = useSettingsContext()

	useEffect(() => {
		discordPresence(
			settingsContext.translation.translatable('homePage.discordPresence.title')
		)

		if (settingsContext.tabId !== 0) {
			navigate(items[settingsContext.tabId || 0].link)
			console.log('page changed to:', items[settingsContext.tabId || 0].link)
		}
	}, [])

	return (
		<>
			{settingsContext.homePageAnimation ? (
				<BubblesAnimation />
			) : (
				<BoxesAnimation />
			)}

			<div className='hero w-full min-h-screen bg-base-200'>
				<div className='hero-content text-center'>
					<div className='max-w-md'>
						<h1 className='text-5xl font-bold'>
							{settingsContext.translation.translatable('homePage.greeting')}
						</h1>
						<p className='py-6'>
							{settingsContext.translation.translatable('homePage.description')}{' '}
							<Link
								to='/instances'
								className='link link-secondary'
								onClick={() => settingsContext.setTab(1)}
							>
								{settingsContext.translation.translatable(
									'homePage.links.play'
								)}
							</Link>{' '}
							{settingsContext.translation.translatable(
								'homePage.description.or'
							)}{' '}
							<Link
								to='/mods'
								className='link link-secondary'
								onClick={() => settingsContext.setTab(2)}
							>
								{settingsContext.translation.translatable('homePage.links.mod')}
							</Link>
						</p>
						<Link
							to='/instances'
							className='btn btn-primary'
							onClick={() => settingsContext.setTab(1)}
						>
							{settingsContext.translation.translatable(
								'homePage.buttons.play'
							)}
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
