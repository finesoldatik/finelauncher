import { FC, SetStateAction, memo, useState } from 'react'
import { ITag } from '../../ModsPage.types'
import { IParams } from '../Mods'
import { ISettingsContext } from '../../../../contexts/SettingsProvider'

interface IDrawerSideProps {
	settingsContext: ISettingsContext
	tags: ITag[]
	setParams: (value: SetStateAction<IParams>) => void
}

interface ISort {
	id: number
	label: string
}

const DrawerSide: FC<IDrawerSideProps> = memo(
	({ settingsContext, tags, setParams }) => {
		console.log('DrawerSide Render')

		const [sorts, setSorts] = useState<ISort[]>([
			{
				id: 1,
				label: settingsContext.translation.translatable(
					'modsPage.drawerSide.filters.byPopularity'
				),
			},
			{
				id: 2,
				label: settingsContext.translation.translatable(
					'modsPage.drawerSide.filters.byLikes'
				),
			},
			{
				id: 3,
				label: settingsContext.translation.translatable(
					'modsPage.drawerSide.filters.byDate'
				),
			},
		])

		return (
			<div className='drawer-side'>
				<label
					htmlFor='my-drawer-4'
					aria-label='close sidebar'
					className='drawer-overlay'
				></label>
				<div className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
					{/* Sidebar content here */}
					<h1 className='text-2xl'>
						{settingsContext.translation.translatable(
							'modsPage.drawerSide.filters'
						)}
					</h1>
					<div className='divider divider-primary'></div>
					<div>
						<div>
							<h2 className='text-lg'>
								{settingsContext.translation.translatable(
									'modsPage.drawerSide.sorts'
								)}
							</h2>
							{sorts.map(sort => (
								<div className='form-control' key={sort.id}>
									<label className='label cursor-pointer'>
										<span className='label-text'>{sort.label}</span>
										<input
											type='radio'
											name='radio-2'
											value={sort.id}
											defaultChecked={sort.id === 1}
											className='radio radio-primary'
											onChange={event =>
												setParams(prev => ({
													...prev,
													page: 1,
													sort: Number(event.target.value),
												}))
											}
										/>
									</label>
								</div>
							))}
						</div>
						<div className='divider'></div>
						<div>
							<h2 className='text-lg'>
								{settingsContext.translation.translatable(
									'modsPage.drawerSide.tags'
								)}
							</h2>
							{tags.map(tag => (
								<div className='form-control' key={tag.id}>
									<label className='label cursor-pointer'>
										<span className='label-text'>{tag.title}</span>
										<input
											type='checkbox'
											className='checkbox checkbox-primary'
											onChange={event => {
												console.log('start')
												console.log('tag.id', tag.id)
												if (event.target.checked)
													setParams(prev => {
														prev.tags.push(tag.id)
														console.log(prev.tags)

														return {
															...prev,
															page: 1,
															tags: prev.tags,
														}
													})
												else
													setParams(prev => {
														prev.tags.splice(prev.tags.indexOf(tag.id))
														console.log(prev.tags)

														return {
															...prev,
															page: 1,
															tags: prev.tags,
														}
													})
											}}
										/>
									</label>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}
)

export default DrawerSide
