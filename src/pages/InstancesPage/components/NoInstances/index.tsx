import { FC } from 'react'
import { Link } from 'react-router-dom'

const NoInstances: FC = () => {
	console.log('NoInstances Render')

	return (
		<div className='relative flex items-center justify-center w-full h-full bg-black bg-opacity-10'>
			<div className='flex flex-col text-center'>
				<figure className='flex justify-center'>
					<img
						className='mt-3'
						src='/img/instance/no-instances.png'
						alt='version icon'
						width={192}
						height={192}
					/>
				</figure>
				<div className='mt-6'>
					<h1 className='text-2xl'>Инстансы не найдены 😢</h1>
					<h3 className='text-lg'>
						Давайте{' '}
						<Link className='link link-primary' to='/new-instance'>
							создадим новый?
						</Link>
					</h3>
				</div>
			</div>
		</div>
	)
}

export default NoInstances
