import { FC, useEffect, useState } from 'react'
import ModWrapper from '../../utils/mod/Wrapper'
import { useNavigate, useParams } from 'react-router-dom'
import { IMod } from './ModPage.interface'
import styles from './ModPage.module.scss'
import ChangeVersion from '../../modals/ChangeVersionModal'

const ModPage: FC = () => {
	const [mod, setMod] = useState<IMod>(Object)
	const [modalActive, setModalActive] = useState<boolean>(false)
	const [modDownloadUrl, setModDownloadUrl] = useState<string>('')

	const params = useParams()
	const id: number = Number(params.id)

	const modWrapper = new ModWrapper()

	useEffect(() => {
		modWrapper.getMod(id).then(value => {
			console.log(value.data.data)
			setMod(value.data.data)
		})
	}, [])

	return (
		<>
			<div className={styles['container']}>
				{mod.content ? (
					<>
						<div className={'black-style ' + styles['content']}>
							<img
								width={256}
								height={256}
								src={'https://voxelworld.ru' + mod.content.pathLogo}
								alt='Лого мода'
							/>
							<h2 className={styles['title']}>{mod.content.title}</h2>
							<div className={styles['author-container']}>
								<h4 className='violet-text'>
									Автор: {mod.content.author.name}
								</h4>
								<h4 className='violet-text'>
									Скачиваний: {mod.content.downloads}
								</h4>
							</div>
							<p className={styles['description']}>{mod.content.description}</p>
							<div className={styles['tags']}>
								{mod.content.tags.map(tag => (
									<button
										className={'black-style ' + styles['tag']}
										key={tag.id}
									>
										{tag.title}
									</button>
								))}
							</div>
						</div>
						<div className={'black-style ' + styles['versions']}>
							<p>Версии:</p>
							{mod.versions ? (
								mod.versions.map(version => (
									<div
										className={'black-style ' + styles['version']}
										onClick={() => {
											setModDownloadUrl(
												`https://voxelworld.ru/mods/${mod.content.id}/version/${version.id}/download`
											)
											setModalActive(true)
										}}
										key={version.id}
									>
										<p>
											{version.version_number}: {version.changelog}
										</p>
										<p className='violet-text'>
											Для версий: {version.engine_format}
										</p>
										<p className='violet-text'>
											Статус: {version.status.title}
										</p>
									</div>
								))
							) : (
								<></>
							)}
						</div>
					</>
				) : (
					<p>Загрузка мода.</p>
				)}
			</div>
			<ChangeVersion
				active={modalActive}
				mod={{ id: mod.content?.id, downloadUrl: modDownloadUrl }}
				setActive={setModalActive}
			/>
		</>
	)
}

export default ModPage
