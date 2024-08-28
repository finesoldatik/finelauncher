import { FC, SetStateAction, memo, useMemo, useState } from 'react'
import { IParams as IModParams } from '../Mods'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'
import { useQuery } from 'react-query'
import { getTags } from '../../../../utils/voxelworld'

interface IDrawerSideProps {
	setModParams: (value: SetStateAction<IModParams>) => void
}

interface IParams {
	type: 'mod' | 'world' | 'texturepack'
}

const fetchTags = async (params: IParams) => {
	console.log('fetchMod')

	const data = await getTags('v1', {
		params: {
			type: params.type,
		},
	})

	const result = data.data.data

	return result
}

const DrawerSide: FC<IDrawerSideProps> = memo(({ setModParams }) => {
	console.log('DrawerSide Render')

	const settingsContext = useSettingsContext()

	// @ts-expect-error НАДО БУДЕТ ЗДЕСЬ ЗАЮЗАТЬ СЕТПАРАМС
	const [params, setParams] = useState<IParams>({
		type: 'mod',
	})

	const { data, isLoading, isError } = useQuery(
		['tags'],
		() => fetchTags(params),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	)

	const sorts = useMemo(
		() => [
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
		],
		[settingsContext.translation]
	)

	if (isLoading) {
		return <div className='skeleton tut nada'></div>
	}

	if (isError) {
		return (
			<p>{settingsContext.translation.translatable('modsPage.mods.error')}</p>
		)
	}

	if (!data) {
		return (
			<p>{settingsContext.translation.translatable('modsPage.mods.noData')}</p>
		)
	}

	console.log(data)

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
											setModParams(prev => ({
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
						{data.map(tag => (
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
												setModParams(prev => {
													prev.tags.push(tag.id)
													console.log(prev.tags)

													return {
														...prev,
														page: 1,
														tags: prev.tags,
													}
												})
											else
												setModParams(prev => {
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
})

export default DrawerSide
