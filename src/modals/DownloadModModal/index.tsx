import { useEffect, useRef, useState } from 'react'
import styles from './DownloadModModal.module.css'
import { IMod } from '../ModModal/ModModal.types'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IOption } from '../../components/Select'
import {
	getInstalledInstances,
	getInstancePath,
} from '../../utils/instanceManager'
import { getModData } from '../../utils/mod'
import { downloadMod } from '../../utils/download'
import { fs, path } from '@tauri-apps/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'

interface IDownloadModModalProps {
	active: boolean
	setActive: (value: boolean) => void
	mod: IMod
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
	const progressRef = useRef<HTMLProgressElement>(null)

	const [instance, setInstance] = useState<IOption>()

	const [instances, setInstances] = useState<IOption[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
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
						if (modData.id === mod.content.id) {
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
		getInstalledInstances().then(value => {
			const entries: IOption[] = value.map(instance => ({
				label: String(instance.name),
				value: String(instance.name),
			}))
			console.log('entries:', entries)
			setInstances(entries)
			setIsLoading(false)
		})
	}, [])

	const onSubmit: SubmitHandler<{ instance: string }> = () => {
		console.log(instance)

		if (instance?.value && !isExists) {
			if (downloadBtnRef.current) downloadBtnRef.current.disabled = true
			if (progressRef.current) progressRef.current.value = 50

			downloadMod(modDownloadUrl, instance.value, mod.content.id).then(() => {
				if (downloadBtnRef.current) downloadBtnRef.current.disabled = false
				if (progressRef.current) progressRef.current.value = 100
			})
			setDownloaded(true)
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
								const option = instances.find(
									option => option.value === event.target.value
								)
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
							{instances.map(version => (
								<option value={version.value} key={version.value}>
									{version.label}
								</option>
							))}
						</select>

						{errors?.instance && (
							<div className='text-error my-1'>{errors.instance.message}</div>
						)}

						<progress
							className='progress progress-success my-2'
							value={0}
							max='100'
							ref={progressRef}
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
