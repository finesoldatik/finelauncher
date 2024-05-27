import { FC, useState } from 'react'
import ModWrapper from '../../utils/mod/Wrapper'
import { useParams } from 'react-router-dom'
import { IMod } from './ModPage.interface'
import styles from './ModPage.module.scss'
import ChangeVersion from '../../modals/ChangeVersionModal'
import { useQuery } from 'react-query'
import LoadingModal from '../../modals/LoadingModal'

const fetchMod = async (id: number) => {
	console.log('fetchMod')
	const modWrapper = new ModWrapper()

	const { data } = await modWrapper.getMod(id)

	const result: IMod = {
		content: data.data.content,
		versions: data.data.versions.reverse(),
	}

	return result
}

const ModPage: FC = () => {
	console.log('ModPage Render')

	const [modalActive, setModalActive] = useState<boolean>(false)
	const [modDownloadUrl, setModDownloadUrl] = useState<string>('')

	const params = useParams()

	const { data, isLoading, isError } = useQuery(
		'mod',
		() => fetchMod(Number(params.id)),
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
		<>
			<div className={styles['container']}>
				<div className={'black-style ' + styles['content']}>
					<img
						width={256}
						height={256}
						src={'https://voxelworld.ru' + data.content.pathLogo}
						alt='Лого мода'
					/>
					<h2 className={styles['title']}>{data.content.title}</h2>
					<div className={styles['author-container']}>
						<h4 className='violet-text'>Автор: {data.content.author.name}</h4>
						<h4 className='violet-text'>
							Скачиваний: {data.content.downloads}
						</h4>
					</div>
					<p className={styles['description']}>{data.content.description}</p>
					<div className={styles['tags']}>
						{data.content.tags.map(tag => (
							<button className={`black-style ${styles['tag']}`} key={tag.id}>
								{tag.title}
							</button>
						))}
					</div>
				</div>
				<div className={`black-style ${styles['versions']}`}>
					<p>Версии:</p>
					{data.versions.map(version => (
						<div
							className={`black-style ${styles['version']}`}
							onClick={() => {
								setModDownloadUrl(
									`https://voxelworld.ru/mods/${data.content.id}/version/${version.id}/download`
								)
								setModalActive(true)
							}}
							key={version.id}
						>
							<p>
								{version.version_number}: {version.changelog}
							</p>
							<p className='violet-text'>Для версий: {version.engine_format}</p>
							<p className='violet-text'>Статус: {version.status.title}</p>
						</div>
					))}
				</div>
			</div>
			<ChangeVersion
				active={modalActive}
				mod={{ id: data?.content.id, downloadUrl: modDownloadUrl }}
				setActive={setModalActive}
			/>
		</>
	)
}

export default ModPage
