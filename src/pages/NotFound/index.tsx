import { useNavigate } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect } from 'react'
import { discordPresence } from '../../utils/discordRPC'

export default function NotFound() {
	const navigate = useNavigate()

	const settingsContext = useSettingsContext()

	useEffect(() => {
		discordPresence(
			settingsContext.translation.translatable('notfound.discordPresence.title')
		)
	}, [])

	return (
		<div className='flex flex-col items-center justify-center h-screen w-full'>
			<h1 className='text-2xl'>Упс.. Что-то пошло не так 😅</h1>
			<div className='flex flex-row gap-1 mt-2'>
				<button className='btn btn-warning' onClick={() => navigate(-1)}>
					{settingsContext.translation.translatable('notfound.back')}
				</button>
				<button className='btn btn-primary' onClick={() => navigate('/')}>
					{settingsContext.translation.translatable('notfound.toHomePage')}
				</button>
			</div>
		</div>
	)
}
