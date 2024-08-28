import { FC } from 'react'
import ControlPanel from '../ControlPanel'
import ModsContainer from '../ModsContainer'

interface IMainContentProps {
	name: string
}

const MainContent: FC<IMainContentProps> = ({ name }) => {
	console.log('MainContent Render')

	return (
		<div className='bg-base-200 p-3 h-[64%]'>
			<ControlPanel name={name} />
			<ModsContainer name={name} />
		</div>
	)
}

export default MainContent
