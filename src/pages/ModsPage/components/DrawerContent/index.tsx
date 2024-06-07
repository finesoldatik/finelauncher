import { FC, SetStateAction, useRef } from 'react'
import { IContent } from '../../ModsPage.types'
import Mod from '../Mod'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { IParams } from '../Mods'

interface IDrawerContentProps {
	content: IContent[]
	setParams: (value: SetStateAction<IParams>) => void
	params: IParams
}

const DrawerContent: FC<IDrawerContentProps> = ({
	content,
	setParams,
	params,
}) => {
	const searchRef = useRef<HTMLInputElement>(null)

	return (
		<div className='drawer-content w-[calc(100%-1px)]'>
			{/* Page content here */}
			<div className='flex justify-center mb-1 py-3 bg-base-300'>
				<label htmlFor='my-drawer-4' className='drawer-button btn btn-primary'>
					Изменить фильтры
				</label>
				<div className='join'>
					<div>
						<div>
							<input
								className='input input-bordered join-item flex items-center gap-2 ml-2 w-full max-w-xs grow'
								placeholder='Искать'
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
					<button className='join-item btn'>Страница {params.page}</button>
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
			<div className='flex flex-row flex-wrap'>
				{content.map(mod => {
					return <Mod mod={mod} key={mod.id} />
				})}
			</div>
		</div>
	)
}

export default DrawerContent
