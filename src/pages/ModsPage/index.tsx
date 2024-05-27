import { FC, useState } from 'react'
import { IMods } from './ModsPage.interface'
import styles from './ModsPage.module.scss'
import ModWrapper from '../../utils/mod/Wrapper'
import Mod from './components/Mod'
import SearchMods from './components/SearchMods'
import { useQuery } from 'react-query'
import LoadingModal from '../../modals/LoadingModal'

const fetchMods = async (page: number, value: string, tags: number[]) => {
	console.log('fetchMod')

	const modWrapper = new ModWrapper()

	const { data } = await modWrapper.getMods({
		params: {
			page,
			title: value ? value : undefined,
			tag_id: tags ? tags : undefined,
		},
	})

	const result: IMods = data.data

	return result
}

const ModsPage: FC = () => {
	console.log('ModsPage Render')

	const [tags, setTags] = useState<Array<number>>([])
	const [value, setValue] = useState<string>('')
	const [page, setPage] = useState<number>(1)
	const { data, isLoading, isError } = useQuery(
		['mods', page, value, tags],
		() => fetchMods(page, value, tags),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	)

	if (isLoading) {
		return <LoadingModal />
	}

	if (isError) {
		return <p>Ошибка при получении данных</p>
	}

	if (!data) {
		return <p>Нет данных</p>
	}

	return (
		<div className={`black-style ${styles['container']}`}>
			<SearchMods setValue={value => setValue(value)} />

			<div className={styles['mods']}>
				{data.content.map(mod => {
					return (
						<Mod mod={mod} setTags={value => setTags(value)} key={mod.id} />
					)
				})}
			</div>
			<button
				className='black-style no-boundary-radius'
				onClick={() => setPage(prev => prev - 1)}
				disabled={page === 1}
			>
				Назад
			</button>
			<button
				className='black-style no-boundary-radius'
				onClick={() => setPage(prev => prev + 1)}
				disabled={data.content.length < 10}
			>
				Вперед
			</button>
		</div>
	)
}

export default ModsPage
