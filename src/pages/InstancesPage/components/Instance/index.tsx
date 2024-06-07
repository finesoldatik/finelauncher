
import { Link } from 'react-router-dom'
import { FC } from 'react'

interface IInstanceProps {
	name: string
	version: string
	image: string
}

const Instance: FC<IInstanceProps> = ({ name, version, image }) => {
	return (
		<Link to={`instances/${name}`} className='btn min-w-64 h-64 bg-base-200 shadow-xl rounded-none m-0.5 flex-col'>
			<figure>
				<img
					className='mt-3'
					src={image}
					alt='version icon'
					width={128}
					height={128}
				/>
			</figure>
			<div className='card-body p-0 text-center'>
				<h3 className='card-title'>{name}</h3>
				<h3 className='card-description'>{version}</h3>
			</div>
		</Link>
	)
}

export default Instance
