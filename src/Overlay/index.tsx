import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'

export default function Overlay() {
	useEffect(() => {
		document.documentElement.style.backgroundColor = 'transparent'
		document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'
	})
	return (
		<div className='flex flex-col'>
			<button className='btn btn-error'>
				<FontAwesomeIcon icon={faXmark} />
			</button>
		</div>
	)
}
