import { FC, useEffect, useState } from 'react'
import { deleteMod } from '../../../../utils/download'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { getInstanceContent } from '../../../../utils/instanceManager'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'

interface IModsContainerProps {
	name: string
}

const ModsContainer: FC<IModsContainerProps> = ({ name }) => {
	console.log('ModsContainer Render')

	const settingsContext = useSettingsContext()

	const [mods, setMods] = useState<string[]>([])

	useEffect(() => {
		getInstanceContent(name).then(content => {
			setMods(content.map(value => String(value.name)))
		})
	}, [])

	return (
		<div className='h-[85%] overflow-y-auto'>
			{mods.length > 1 ? (
				mods.map((value, idx) => {
					console.log(mods)
					if (value !== 'temp_dir')
						return (
							<div
								className='flex bg-base-100 mx-2 my-1 justify-between rounded-lg'
								key={idx}
							>
								<h1 className='text-lg mt-2 ml-2'>{value}</h1>
								<div
									className='btn btn-error'
									onClick={async () => {
										deleteMod(name, value)
										setMods(mods.filter(val => val !== value))
									}}
								>
									<FontAwesomeIcon icon={faTrash} />
								</div>
							</div>
						)
					else console.log('temp_dir is skipped')
				})
			) : (
				<p>
					{settingsContext.translation.translatable(
						'instancePage.modsContainer.emptyMods.title'
					)}{' '}
					<Link to={'/mods'} className='link link-primary'>
						{settingsContext.translation.translatable(
							'instancePage.modsContainer.emptyMods.links.add'
						)}
					</Link>
				</p>
			)}
		</div>
	)
}

export default ModsContainer
