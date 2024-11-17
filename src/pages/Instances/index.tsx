import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect } from 'react'
import { discordPresence } from '../../services/discordRPC'

export default function Instances() {
	console.log('InstancesPage Render')

	const navigate = useNavigate()
	const settingsContext = useSettingsContext()

	const params = useParams<{ name: string | undefined }>()

	useEffect(() => {
		discordPresence('Смотрит новости 👀')
	}, [])

	useEffect(() => {
		navigate(settingsContext.currentPage)
	}, [settingsContext.currentPage])

	console.log('name', params.name)

	return (
		<div>
			<Link
				className='btn btn-primary'
				to={'/new-instance'}
				onClick={() => settingsContext.setPage('/new-instance')}
			>
				New instance
			</Link>
			<Link className='btn btn-primary' to={'/instances/adasdsadas'}>
				adasdsadas
			</Link>
		</div>
	)
}
