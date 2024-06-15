import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { discordPresence } from '../utils/discordRPC'

export default function Overlay() {
	console.log('Overlay')
	discordPresence('Открыл оверлей')

	useEffect(() => {
		document.documentElement.style.backgroundColor = 'transparent'
		document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
	})
	return (
		<div className='flex flex-col'>
			<button className='btn btn-error' title='x'>
				<FontAwesomeIcon icon={faXmark} />
			</button>
		</div>
	)
}
