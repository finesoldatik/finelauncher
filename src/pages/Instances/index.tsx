import { useNavigate, useParams } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect } from 'react'
import { discordPresence } from '../../services/discordRPC'
import InstancesMenu from '../../components/InstancesMenu'

export default function Instances() {
	console.log('InstancesPage Render')

	const navigate = useNavigate()
	const settingsContext = useSettingsContext()

	const { name } = useParams<{ name: string | undefined }>()

	useEffect(() => {
		discordPresence('Смотрит новости 👀')
	}, [])

	useEffect(() => {
		navigate(settingsContext.currentPage)
	}, [settingsContext.currentPage])

	console.log('name', name)

	return (
		<div className='flex flex-row'>
			<InstancesMenu
				instances={[
					{ name: 'Моя сборка', version: '0.20.3' },
					{ name: 'Сборка №2', version: '0.20.3' },
					{
						name: 'названия в 33 символа максимум',
						version: '0.20.3',
					},
					{ name: 'Сборка №233333', version: '0.20.3' },
				]}
			/>

			<div className='w-full h-screen'>
				{name}
				<div></div>
			</div>
		</div>
	)
}
