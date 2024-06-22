import { FC } from 'react'
import { ISettingsContext } from '../../../../contexts/SettingsProvider'

interface ITitleContentProps {
	settingsContext: ISettingsContext,
	icon: string
	name: string
	versionName: string
}

const TitleContent: FC<ITitleContentProps> = ({ settingsContext, icon, name, versionName }) => {
	console.log('TitleContent Render')
  
	return (
		<div className='flex flex-row bg-base-300 p-2 h-[26%]'>
			<img height={160} src={icon} alt='version icon' />
			<div className='flex items-center ml-2 text-xl'>
				<div>
					<h1>
						{settingsContext.translation.translatable(
							'instancePage.titleContent.fields.name'
						)}
						: {name}
					</h1>
					<h1>
						{settingsContext.translation.translatable(
							'instancePage.titleContent.fields.version'
						)}
						: {versionName}
					</h1>
				</div>
			</div>
		</div>
	)
}

export default TitleContent
