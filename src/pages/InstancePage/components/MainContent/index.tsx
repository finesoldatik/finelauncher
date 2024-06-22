import { FC } from 'react'
import ControlPanel from '../ControlPanel'
import ModsContainer from '../ModsContainer'
import { ISettingsContext } from '../../../../contexts/SettingsProvider'

interface IMainContentProps {
	settingsContext: ISettingsContext
	name: string
}

const MainContent: FC<IMainContentProps> = ({ settingsContext, name }) => {
	console.log('MainContent Render')

	return (
		<div className='bg-base-200 p-3 h-[64%]'>
			<ControlPanel settingsContext={settingsContext} name={name} />
			<ModsContainer settingsContext={settingsContext} name={name} />
		</div>
	)
}

export default MainContent
