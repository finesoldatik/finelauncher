import { FC } from 'react'
import { openInFileManager } from '../../../../utils/instanceManager'
import { faGear, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { deleteInstance } from '../../../../utils/download'
import { useNavigate } from 'react-router-dom'
import { ISettingsContext } from '../../../../contexts/SettingsProvider'

interface IControlPanelProps {
	settingsContext: ISettingsContext
	name: string
}

const ControlPanel: FC<IControlPanelProps> = ({ settingsContext, name }) => {
	console.log('ControlPanel Render')

	const navigate = useNavigate()

	return (
		<div className='flex flex-row justify-between'>
			<h1 className='text-2xl ml-2 mt-1'>
				{settingsContext.translation.translatable(
					'instancePage.controlPanel.mods'
				)}
			</h1>
			<div>
				<div className='join rounded-none rounded-l-lg'>
					<div
						className='btn join-item bg-base-100'
						onClick={() => openInFileManager(name)}
					>
						{settingsContext.translation.translatable(
							'instancePage.controlPanel.buttons.openInFileManager'
						)}
					</div>
					<div
						className='btn join-item bg-base-100'
						onClick={() => console.log('Ещё не готово')}
					>
						<FontAwesomeIcon icon={faGear} />
					</div>
					<div
						className='btn btn-error join-item'
						onClick={() =>
							deleteInstance(name).then(() => {
								navigate('/instances')
							})
						}
					>
						<FontAwesomeIcon icon={faTrash} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ControlPanel
