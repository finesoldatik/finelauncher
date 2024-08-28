import { FC, SetStateAction, memo, useRef, useState } from 'react'
import Mod from '../Mod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { IParams } from '../Mods'
import ModModal from '../../../../modals/ModModal'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'
import { Mod as IMod } from '../../../../utils/voxelworld/voxelworld.interface'

interface IDrawerContentProps {
	content: IMod[]
	setParams: (value: SetStateAction<IParams>) => void
	params: IParams
}

const DrawerContent: FC<IDrawerContentProps> = memo(
	({ content, setParams, params }) => {
		console.log('DrawerContent Render')

		const settingsContext = useSettingsContext()

		const [active, setActive] = useState<boolean>(false)
		const [currentModId, setCurrentModId] = useState<number>()

		const searchRef = useRef<HTMLInputElement>(null)

		return (
			<div className='drawer-content w-[calc(100%-1px)]'>
				{/* Page content here */}
				<div className='flex justify-center mb-1 bg-base-300 py-3'>
					<label
						htmlFor='my-drawer-4'
						className='drawer-button btn btn-primary'
					>
						{settingsContext.translation.translatable(
							'modsPage.drawerContent.changeFilters'
						)}
					</label>
					<div className='join'>
						<div>
							<div>
								<input
									className='input input-bordered join-item flex items-center gap-2 ml-2 w-full max-w-xs grow'
									placeholder={settingsContext.translation.translatable(
										'modsPage.drawerContent.searchPlaceholder'
									)}
									ref={searchRef}
								/>
							</div>
						</div>

						<div
							className='btn btn-primary join-item'
							onClick={() => {
								setParams(prev => ({
									...prev,
									value: searchRef.current ? searchRef.current.value : '',
								}))
							}}
						>
							<FontAwesomeIcon icon={faMagnifyingGlass} />
						</div>
					</div>

					<div className='join ml-2'>
						<button
							className='join-item btn btn-primary'
							onClick={() =>
								setParams(prev => ({ ...prev, page: prev.page - 1 }))
							}
							disabled={params.page === 1}
						>
							«
						</button>
						<button className='join-item btn'>
							{settingsContext.translation.translatable(
								'modsPage.drawerContent.page'
							)}{' '}
							{params.page}
						</button>
						<button
							className='join-item btn btn-primary'
							onClick={() =>
								setParams(prev => ({ ...prev, page: prev.page + 1 }))
							}
							disabled={content.length < 10}
						>
							»
						</button>
					</div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 p-1'>
					{content.map(mod => (
						<Mod
							mod={mod}
							setCurrentModId={setCurrentModId}
							setActive={setActive}
							key={mod.id}
						/>
					))}
				</div>
				{active && (
					<ModModal
						active={active}
						setActive={setActive}
						modId={Number(currentModId)}
					/>
				)}
			</div>
		)
	}
)

export default DrawerContent
