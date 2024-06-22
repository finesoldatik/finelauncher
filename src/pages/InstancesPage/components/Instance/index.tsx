import { Link } from 'react-router-dom'
import { FC } from 'react'

interface IInstanceProps {
	name: string
	version: string
	image: string
}

const Instance: FC<IInstanceProps> = ({ name, version, image }) => {
	console.log('Instance Render')

	return (
		<Link
			to={name}
			className='flex grow btn min-w-64 h-64 bg-base-200 shadow-xl rounded-none flex-col'
		>
			<figure>
				<div className='relative'>
					<div className='indicator'>
						<div className='indicator-item indicator-bottom badge badge-primary'>
							{version}
						</div>
						<img
							className='mt-3'
							src={image}
							alt='version icon'
							width={128}
							height={128}
						/>
					</div>
				</div>
			</figure>
			<div className='card-body p-0 text-center'>
				<h3 className='card-title'>{name}</h3>
			</div>
		</Link>
	)
}

export default Instance
