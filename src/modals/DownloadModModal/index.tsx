import { useEffect, useRef, useState } from 'react'
import styles from './DownloadModModal.module.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IOption } from '../../components/Select'
import {
	getInstalledInstances,
	getInstanceData,
	getInstancePath,
} from '../../utils/instanceManager'
import { getModData } from '../../utils/mod'
import { downloadMod } from '../../utils/download'
import { fs, path } from '@tauri-apps/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { listen } from '@tauri-apps/api/event'

interface IDownloadModModalProps {
	active: boolean
	setActive: (value: boolean) => void
	mod: any
	modDownloadUrl: string
}

export default function DownloadModModal({
	active,
	setActive,
	mod,
	modDownloadUrl,
}: IDownloadModModalProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<{ instance: string }>()

	const downloadBtnRef = useRef<HTMLButtonElement>(null)

	const [progress, setProgress] = useState<number>(0)

	const [instance, setInstance] = useState<IOption>()

	const [instances, setInstances] = useState<(IOption | undefined)[]>([])
	const [isLoading, setLoading] = useState<boolean>(true)
	const [isExists, setExists] = useState<boolean>(false)
	const [downloaded, setDownloaded] = useState<boolean>(false)

	useEffect(() => {
		if (instance !== undefined) {
			const modExists = async () => {
				const content = await fs.readDir(
					await path.join(
						await getInstancePath(String(instance?.value)),
						'game',
						'content'
					)
				)
				content.forEach(async value => {
					if (value.name !== 'temp_dir') {
						const modContent = await fs.readDir(value.path)
						const modDataFile = modContent.find(file => {
							return file.name === 'mod.json'
						})
						console.log('modification', modDataFile)
						const modData = await getModData(
							String(instance?.value),
							String(value?.name)
						)
						if (modData.id === mod.id) {
							console.log('exists?', true)
							setExists(true)
						}
					}
				})
			}
			modExists()
		}
	}, [instance])

	useEffect(() => {
		const unSubscribeProgress = listen('download_progress', event => {
			console.log('Событие download_progress:', event.payload)
			setProgress(Number(event.payload))
		})

		return () => {
			unSubscribeProgress.then(unsub => unsub())
		}
	}, [])

	useEffect(() => {
		const getInstances = async () => {
			const installedInstances = await getInstalledInstances()
			Promise.all(
				installedInstances.map(async instance => {
					if (
						instance.children?.find(value => {
							return value.name === 'instance.json'
						}) &&
						instance.name
					) {
						const instanceData = await getInstanceData(String(instance.name))
						return {
							label: instanceData.name,
							value: instance.name,
						}
					}
				})
			).then(value => {
				const filtered = value.filter(val => val !== undefined)
				console.log(filtered)
				setInstances(filtered)
				setLoading(false)
			})
		}

		getInstances()
	}, [])

	useEffect(() => {
		if (progress === 100) setDownloaded(true)
	}, [progress])

	const onSubmit: SubmitHandler<{ instance: string }> = () => {
		console.log(instance)

		if (instance?.value && !isExists) {
			if (downloadBtnRef.current) downloadBtnRef.current.disabled = true

			downloadMod(modDownloadUrl, instance.value, mod.id).then(() => {
				if (downloadBtnRef.current) downloadBtnRef.current.disabled = false
			})
		}
	}

	return (
		<div
			className={
				active ? `${styles['modal']} ${styles['active']}` : styles['modal']
			}
			onClick={() => setActive(false)}
		>
			<div className={styles['content']} onClick={e => e.stopPropagation()}>
				{!isExists && !downloaded && (
					<form
						className='flex h-full flex-col justify-center items-center'
						onSubmit={handleSubmit(onSubmit)}
					>
						<select
							{...register('instance', {
								required: 'Заполните это поле!',
							})}
							className={`select select-primary w-full my-2`}
							title='select'
							disabled={isLoading}
							onChange={event => {
								const option = instances.find(option => {
									if (!option) return
									option.value === event.target.value
								})
								setInstance({
									label: String(option?.label),
									value: String(option?.value),
								})
								console.log(option)
							}}
							defaultValue=''
						>
							<option value='' disabled>
								Выберите версию игры
							</option>
							{instances.map((version, idx) => {
								if (!version) return
								console.log(version)
								return (
									<option value={version.value} key={idx}>
										{version.label}
									</option>
								)
							})}
						</select>

						{errors?.instance && (
							<div className='text-error my-1'>{errors.instance.message}</div>
						)}

						<progress
							className='progress progress-success my-2'
							value={progress}
							max='100'
						></progress>

						<button
							className='btn btn-primary my-2'
							ref={downloadBtnRef}
							type='submit'
						>
							Скачать
						</button>
					</form>
				)}
				{isExists && (
					<div className='flex h-full justify-center items-center'>
						<h1 className='text-2xl'>Мод уже установлен в выбранной версии.</h1>
					</div>
				)}
				{downloaded && (
					<div className='flex h-full justify-center items-center'>
						<h1 className='text-2xl'>
							Мод успешно установлен! <FontAwesomeIcon icon={faCheck} />
						</h1>
					</div>
				)}
			</div>
		</div>
	)
}
