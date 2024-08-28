import { FC, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faCloudArrowDown,
	faHeart,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'
import { Mod as IMod } from '../../../../utils/voxelworld/voxelworld.interface'

interface IModProps {
	mod: IMod
	setCurrentModId: (value: number) => void
	setActive: (value: boolean) => void
}

const Mod: FC<IModProps> = memo(({ mod, setCurrentModId, setActive }) => {
	console.log('Mod Render')

	const settingsContext = useSettingsContext()

	return (
		<div
			className='flex grow btn min-w-64 h-80 bg-base-200 shadow-xl rounded-none m-0.5'
			onClick={() => {
				setCurrentModId(mod.id)
				setActive(true)
			}}
		>
			<figure className='mt-3'>
				<img
					src={`https://voxelworld.ru${mod.pathLogo}`}
					alt='mod icon'
					width={128}
					height={128}
				/>
			</figure>
			<div className='card-body p-0'>
				<h3 className='card-title'>{mod.title}</h3>
				<label>
					<FontAwesomeIcon icon={faCloudArrowDown} /> {mod.downloads}{' '}
					<FontAwesomeIcon icon={faHeart} /> {mod.likes}
				</label>
				<label className='flex'>
					<div className='avatar'>
						{mod.author.isAvatar ? (
							<>
								<div className='w-6 h-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
									<img
										src={`https://voxelworld.ru/${mod.author.avatar}`}
										alt='avatar'
									/>
								</div>
								<p className='ml-3 mt-1'>{mod.author.name}</p>
							</>
						) : (
							<>
								<FontAwesomeIcon icon={faUser} />
								<p className='ml-2'>{mod.author.name}</p>
							</>
						)}
					</div>
				</label>
				<div className='w-56 text-sm breadcrumbs'>
					<ul>
						<li>
							{settingsContext.translation.translatable('modsPage.mod.tags')}:
						</li>
						{mod.tags.length ? (
							mod.tags.map(tag => <li key={tag.id}>{tag.title}</li>)
						) : (
							<li>
								{settingsContext.translation.translatable(
									'modsPage.mod.noTags'
								)}
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	)
})

export default Mod
