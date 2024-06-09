import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ModModal.module.css'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from 'react-query'
import { IMod } from './ModModal.types'
import ModWrapper from '../../utils/mod/Wrapper'
import { useState } from 'react'
import DownloadModModal from '../DownloadModModal'

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

interface IModModalProps {
	active: boolean
	setActive: (value: boolean) => void
	modId: number
}

export default function ModModal({ active, setActive, modId }: IModModalProps) {
	const [modalActive, setModalActive] = useState<boolean>(false)
	const [modDownloadUrl, setModDownloadUrl] = useState<string>()

	const { data, isLoading, isError } = useQuery<IMod>(
		'mod',
		() => fetchMod(modId),
		{
			keepPreviousData: true,
			refetchOnWindowFocus: false,
		}
	)

	if (isLoading) {
		return <></>
	}

	if (isError) {
		return <p>Ошибка при получении данных</p>
	}

	if (!data) {
		return <p>Нет данных</p>
	}

	return (
		<>
			<div
				className={
					active ? `${styles['modal']} ${styles['active']}` : styles['modal']
				}
				onClick={() => setActive(false)}
			>
				<div className={styles['content']} onClick={e => e.stopPropagation()}>
					<div className='flex flex-row h-full'>
						<div className='flex flex-col w-2/3 mr-1 h-1/2'>
							<div className='h-[160px] flex flex-row grow p-2'>
								<img
									src={`https://voxelworld.ru${data.content.pathLogo}`}
									alt='mod icon'
								/>
								<div className='flex items-center ml-2 text-xl'>
									<div className='flex flex-col text-start'>
										<h1>{data.content.title}</h1>
										<label className='flex'>
											<div className='avatar mt-2'>
												{data.content.author.isAvatar ? (
													<>
														<div className='w-6 h-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
															<img
																src={`https://voxelworld.ru/${data.content.author.avatar}`}
																alt='avatar'
															/>
														</div>
														<p className='ml-3'>{data.content.author.name}</p>
													</>
												) : (
													<>
														<FontAwesomeIcon icon={faUser} />
														<p className='ml-2'>{data.content.author.name}</p>
													</>
												)}
											</div>
										</label>
									</div>
								</div>
							</div>
							<div className='bg-base-300 p-1.5'>
								{data.content.description}
							</div>
						</div>
						<div className='flex flex-col w-1/3 h-full overflow-y-auto grow bg-base-300 p-2'>
							{data.versions.map(version => (
								<button
									className='text-start bg-base-100 my-0.5 p-1 hover:bg-base-200'
									onClick={() => {
										setModDownloadUrl(
											`https://voxelworld.ru/mods/${data.content.id}/version/${version.id}/download`
										)
										setModalActive(true)
									}}
									key={version.id}
								>
									<h4 className='text-lg'>
										{version.status.title} {version.version_number}
									</h4>
									<p className='mt-0.5'>Для {version.engine_format}</p>
								</button>
							))}
						</div>
					</div>
					{/* <div className='flex flex-row mt-3'>
					<progress
						className='progress progress-primary h-3 mt-4 mx-4'
						value={0}
						max='100'
					></progress>
					<button className='btn btn-primary'>Скачать</button>
				</div> */}
				</div>
			</div>
			<DownloadModModal
				active={modalActive}
				setActive={setModalActive}
				mod={data}
				modDownloadUrl={String(modDownloadUrl)}
			/>
		</>
	)
}
