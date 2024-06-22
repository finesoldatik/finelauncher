import { FC } from 'react'
import { ISettingsContext } from '../../../../contexts/SettingsProvider'

interface ILoadingInstancesProps {
	settingsContext: ISettingsContext
}

const LoadingInstances: FC<ILoadingInstancesProps> = ({ settingsContext }) => {
	console.log('NoInstances Render')

	return (
		<div className='relative flex items-center justify-center w-full h-full bg-black bg-opacity-10'>
			<div className='flex flex-col text-center'>
				<figure className='flex justify-center'>
					<img
						className='mt-3'
						src='/img/instance/loading-instances.png'
						alt='version icon'
						width={192}
						height={192}
					/>
				</figure>
				<div className='mt-6'>
					<h1 className='text-2xl'>
						{settingsContext.translation.translatable(
							'instancesPage.loading.title'
						)}{' '}
						✨
					</h1>
					<h3 className='text-lg'>
						{settingsContext.translation.translatable(
							'instancesPage.loading.description'
						)}
						..
					</h3>
				</div>
			</div>
		</div>
	)
}

export default LoadingInstances
