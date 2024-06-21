import { downloadVersion } from '../../../../utils/download'
import { instanceExists } from '../../../../utils/instanceManager'
import VersionWrapper, { IVersion } from '../../../../utils/version'
import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { os } from '@tauri-apps/api'
import { listen } from '@tauri-apps/api/event'

interface INewInstance {
	name: string
	version: string
}

interface IFormProps {
	setModalActive: (value: boolean) => void
}

const Form: FC<IFormProps> = ({ setModalActive }) => {
	console.log('Form Render')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<INewInstance>()

	const [versions, setVersions] = useState<IVersion[]>([])
	const [isLoading, setLoading] = useState<boolean>(true)
	const [isDownloading, setDownloading] = useState<boolean>(false)
	const [progress, setProgress] = useState<number>(0)

	useEffect(() => {
		const versionWrapper = new VersionWrapper()
		const getVersions = async () => {
			const platform = await os.platform()
			let releases: IVersion[] = []

			if (platform === 'win32') releases = versionWrapper.getWindowsVersions()
			else if (platform === 'linux')
				releases = versionWrapper.getLinuxVersions()

			setVersions(releases)
			setLoading(false)
		}
		versionWrapper.updateRepositories().then(() => getVersions())
	}, [])

	const onSubmit: SubmitHandler<INewInstance> = data => {
		console.log('data', data)

		instanceExists(data.name).then(value => {
			if (!value) {
				setDownloading(true)
				downloadVersion(
					versions.find(ver => ver.url == data?.version)!,
					data.name
				).then(() => {
					setDownloading(false)
					setModalActive(true)
				})
			}
		})
	}

	useEffect(() => {
		const unSubscribeProgress = listen('download_progress', event => {
			console.log('Событие download_progress:', event.payload)
			setProgress(Number(event.payload))
		})

		return () => {
			unSubscribeProgress.then(unsub => unsub())
		}
	}, [])

	return (
		<div className='flex w-full h-full justify-center items-center'>
			<form className='flex flex-col w-1/3' onSubmit={handleSubmit(onSubmit)}>
				<label className='form-control w-full'>
					<div className='label'>
						<span className='label-text'>До 12 символов</span>
					</div>
					<input
						{...register('name', {
							required: 'Заполните это поле!',
							maxLength: 12,
						})}
						type='text'
						placeholder='Введите имя инстанса'
						className='input input-bordered input-primary w-full my-2'
						disabled={isDownloading}
					/>
				</label>
				{errors?.name && (
					<div className='text-error my-1'>{errors.name.message}</div>
				)}

				<select
					{...register('version', {
						required: 'Заполните это поле!',
					})}
					className='select select-primary w-full my-2'
					title='select'
					disabled={isLoading || isDownloading}
					defaultValue=''
				>
					<option value='' disabled>
						Выберите версию игры
					</option>
					<optgroup label='Voxel Engine'>
						{versions
							.filter(value => value.repository.name === 'VE')
							.map(version => (
								<option value={version.url} key={version.url}>
									{version.name}
								</option>
							))}
					</optgroup>
					<optgroup label='Rusty Voxel Engine'>
						{versions
							.filter(value => value.repository.name === 'RVE')
							.map(version => (
								<option value={version.url} key={version.url}>
									{version.name}
								</option>
							))}
					</optgroup>
				</select>

				{errors?.version && (
					<div className='text-error my-1'>{errors.version.message}</div>
				)}
				<div className='flex flex-row'>
					<progress
						className='progress progress-success my-2'
						value={progress}
						max='100'
					></progress>
					<h4 className='ml-2'>{progress}%</h4>
				</div>

				<button
					className='btn btn-primary my-2'
					type='submit'
					disabled={isDownloading}
				>
					Создать
				</button>
			</form>
		</div>
	)
}

export default Form
