import { FC } from 'react'
import { useAlertContext } from '../../contexts/AlertProvider'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

const NewAlert: FC = () => {
	console.log('AlertsContainer Render')

	const alertContext = useAlertContext()

	return (
		<>
			{alertContext.alerts.filter(alert => alert.active).length >= 1 && (
				<div className='absolute bottom-4 right-3 btn bg-base-300 h-max p-3'>
					<h2 className='flex text-2xl p-3'>
						<FontAwesomeIcon icon={faBell} />
					</h2>
					<div className='flex flex-col'>
						{alertContext.alerts.map(alert => {
							if (alert.active) {
								const description = `${alert.description.substring(0, 38)}${
									alert.description.length >= 38 ? '...' : ''
								}`

								return (
									<div className='max-w-96' key={alert.id}>
										<p className='text-primary'>{alert.title}</p>
										<p className='text-secondary'>{description}</p>
									</div>
								)
							}
						})}
					</div>
				</div>
			)}
		</>
	)
}

export default NewAlert
