import { FC } from 'react'

const LoadingInstances: FC = () => {
	console.log('LoadingInstances Render')
	
	return (
		<div className='btn w-64 h-64 bg-base-200 shadow-xl rounded-none m-0.5'>
			<figure>
				<img
					className='mt-3'
					src='/img/instance/loading-instances.png'
					alt='version icon'
					width={128}
					height={128}
				/>
			</figure>
			<div className='card-body p-0'>
				<h3 className='card-title'>Инстансы загружаются</h3>
			</div>
		</div>
	)
}

export default LoadingInstances
