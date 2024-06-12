import BoxesAnimation from '../../components/BoxesAnimation'
import BubblesAnimation from '../../components/BubblesAnimation'
import { Link, useNavigate } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect } from 'react'
import { items } from '../../components/Sidebar/data'

export default function HomePage() {
	console.log('HomePage Render')

	const navigate = useNavigate()
	const settingsContext = useSettingsContext()

	useEffect(() => {
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
						<h1 className='text-5xl font-bold'>Привет!</h1>
						<p className='py-6'>
							это главная страница, здесь ничего интересного, давай пойдем{' '}
							<Link to='/instances' className='link link-secondary'>
								играть
							</Link>{' '}
							или{' '}
							<Link to='/mods' className='link link-secondary'>
								выбирать моды
							</Link>
						</p>
						<Link to='/instances' className='btn btn-primary'>
							Начать играть
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}
