import { faRotateRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface INavbarProps {
	loadInstances: () => void
}

const Navbar: FC<INavbarProps> = ({ loadInstances }) => {
	const navigate = useNavigate()

	return (
		<div className='navbar bg-base-300'>
			<div className='flex-1'>
				<button
					className='btn bg-base-200 btn-ghost text-xl'
					onClick={() => navigate('/new-instance')}
				>
					Создать
				</button>
			</div>
			<div className='flex-none'>
				<div
					className='btn bg-base-200 btn-square btn-ghost'
					onClick={() => loadInstances()}
				>
					<FontAwesomeIcon icon={faRotateRight} />
				</div>
			</div>
		</div>
	)
}

export default Navbar
