import { FC, memo, useState } from 'react'
import { useQuery } from 'react-query'
import ModSkeleton from '../ModSkeleton'
import DrawerContent from '../DrawerContent'
import DrawerSide from '../DrawerSide'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'
import { getMods } from '../../../../utils/voxelworld'

export interface IParams {
	sort: 1 | 2 | 3 | 4 | number
	sortOrder: 'desc' | 'asc'
	page: number
	value: string
	tags: number[]
}

const fetchMods = async (params: IParams) => {
	console.log('fetchMod')

	const data = await getMods('v1', {
		params: {
			sort: params.sort,
			sortOrder: params.sortOrder,
			page: params.page,
			title: params.value ? params.value : undefined,
			tag_id: params.tags ? params.tags : undefined,
		},
	})

	const result = data.data

	return result
}

const Mods: FC = memo(() => {
	console.log('Mods Render')

	const settingsContext = useSettingsContext()

	const [params, setParams] = useState<IParams>({
		sort: 1,
		sortOrder: 'desc',
		page: 1,
		value: '',
		tags: [],
	})
	const { data, isLoading, isError } = useQuery(
		['mods', params],
		() => fetchMods(params),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	)

	if (isLoading) {
		return (
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 p-1'>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
					<ModSkeleton key={value} />
				))}
			</div>
		)
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

	return (
		<div className='items-center'>
			<div className='drawer drawer-end'>
				<input
					id='my-drawer-4'
					type='checkbox'
					className='drawer-toggle'
					title='drawer'
				/>
				<DrawerContent content={data} setParams={setParams} params={params} />
				<DrawerSide setModParams={setParams} />
			</div>
		</div>
	)
})

export default Mods
