import { FC, memo, useState } from 'react'
import { IMods } from '../../ModsPage.types'
import ModWrapper from '../../../../utils/mod/Wrapper'
import { useQuery } from 'react-query'
import ModSkeleton from '../ModSkeleton'
import DrawerContent from '../DrawerContent'
import DrawerSide from '../DrawerSide'
import { ISettingsContext } from '../../../../contexts/SettingsProvider'

export interface IParams {
	sort: number
	page: number
	value: string
	tags: number[]
}

const fetchMods = async (params: IParams) => {
	console.log('fetchMod')

	const modWrapper = new ModWrapper()

	const { data } = await modWrapper.getMods({
		params: {
			sort: params.sort,
			page: params.page,
			title: params.value ? params.value : undefined,
			tag_id: params.tags ? params.tags : undefined,
		},
	})

	const result: IMods = data.data

	return result
}

interface IModsProps {
	settingsContext: ISettingsContext
}

const Mods: FC<IModsProps> = memo(({ settingsContext }) => {
	console.log('Mods Render')

	const [params, setParams] = useState<IParams>({
		sort: 1,
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
				<DrawerContent
					settingsContext={settingsContext}
					content={data.content}
					setParams={setParams}
					params={params}
				/>
				<DrawerSide
					settingsContext={settingsContext}
					tags={data.tags}
					setParams={setParams}
				/>
			</div>
		</div>
	)
})

export default Mods
