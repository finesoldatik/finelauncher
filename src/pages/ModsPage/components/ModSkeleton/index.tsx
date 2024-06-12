import { FC } from 'react'

const ModSkeleton: FC = () => {
	console.log('ModSkeleton Render')

	return (
		<div className='card w-64 h-80 bg-base-200 shadow-xl rounded-none m-0.5 flex-grow flex-wrap'>
			<div className='card-body p-0'>
				<div className='flex justify-center'>
					<div className='skeleton h-32 w-32 mt-3'></div>
				</div>
				<div className='skeleton h-4 w-32 mt-14'></div>
				<div className='flex justify-center'>
					<div className='skeleton h-4 w-8'></div>
					<div className='skeleton h-4 w-8'></div>
				</div>
				<div className='skeleton h-4 w-40'></div>
				<div className='skeleton h-4 w-full mt-2'></div>
			</div>
		</div>
	)
}

export default ModSkeleton
