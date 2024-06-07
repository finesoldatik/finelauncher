import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const NewInstance: FC = () => {
	const navigate = useNavigate()
	return (
		<div
			className='btn w-64 h-64 bg-base-200 shadow-xl rounded-none m-0.5 flex-col'
			onClick={() => navigate('/new-instance')}
		>
			<FontAwesomeIcon className='mt-3' icon={faPlus} size='10x' />
			<div className='card-body p-0'>
				<h3 className='card-title'>Новый инстанс</h3>
			</div>
		</div>
	)
}

export default NewInstance
