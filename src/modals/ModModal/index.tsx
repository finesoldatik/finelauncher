import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './ModModal.module.css'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from 'react-query'
import { useState } from 'react'
import DownloadModModal from '../DownloadModModal'
import { getMod, getVersions } from '../../utils/voxelworld'

const fetchMod = async (id: number) => {
	console.log('fetchMod')

	const { data } = await getMod('v1', id)

	console.log(data)

	const result = data

	console.log('mod', result)

	return result
}

const fetchVersions = async (id: number) => {
	console.log('fetchVersions')

	const { data } = await getVersions('v1', id, {
		params: {
			type: 'mod',
		},
	})

	console.log(data)

	const result = data.reverse()

	console.log('versions', result)

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

	console.log('ModModal Render')

	const mod = useQuery('mod', () => fetchMod(modId), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	})

	const versions = useQuery('versions', () => fetchVersions(modId), {
		keepPreviousData: true,
		refetchOnWindowFocus: false,
	})

	if (mod.isLoading || versions.isLoading) {
		return <></>
	}

	if (mod.isError || versions.isError) {
		return <p>Ошибка при получении данных</p>
	}

	if (!mod.data || !versions.data) {
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
									src={`https://voxelworld.ru${mod.data.pathLogo}`}
									alt='mod icon'
								/>
								<div className='flex items-center ml-2 text-xl'>
									<div className='flex flex-col text-start'>
										<h1>{mod.data.title}</h1>
										<label className='flex'>
											<div className='avatar mt-2'>
												{mod.data.author.isAvatar ? (
													<>
														<div className='w-6 h-6 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
															<img
																src={`https://voxelworld.ru/${mod.data.author.avatar}`}
																alt='avatar'
															/>
														</div>
														<p className='ml-3'>{mod.data.author.name}</p>
													</>
												) : (
													<>
														<FontAwesomeIcon icon={faUser} />
														<p className='ml-2'>{mod.data.author.name}</p>
													</>
												)}
											</div>
										</label>
									</div>
								</div>
							</div>
							<div className='bg-base-300 p-1.5'>
								{mod.data.detail_description.version}
							</div>
						</div>
						<div className='flex flex-col w-1/3 h-full overflow-y-auto grow bg-base-300 p-2'>
							{versions.data.map(version => (
								<button
									className='text-start bg-base-100 my-0.5 p-1 hover:bg-base-200'
									onClick={() => {
										setModDownloadUrl(
											`https://voxelworld.ru/mods/${mod.data.id}/version/${version.id}/download`
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
				</div>
			</div>
			{modalActive && (
				<DownloadModModal
					active={modalActive}
					setActive={setModalActive}
					mod={mod.data}
					modDownloadUrl={String(modDownloadUrl)}
				/>
			)}
		</>
	)
}
