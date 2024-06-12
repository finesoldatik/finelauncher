import { FC } from 'react'

interface ITitleContentProps {
	icon: string
	name: string
	versionName: string
}

const TitleContent: FC<ITitleContentProps> = ({ icon, name, versionName }) => {
	console.log('TitleContent Render')
  
	return (
		<div className='flex flex-row bg-base-300 p-2 h-[26%]'>
			<img height={160} src={icon} alt='version icon' />
			<div className='flex items-center ml-2 text-xl'>
				<div>
					<h1>Имя: {name}</h1>
					<h1>Версия: {versionName}</h1>
				</div>
			</div>
		</div>
	)
}

export default TitleContent
