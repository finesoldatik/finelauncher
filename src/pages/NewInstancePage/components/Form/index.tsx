import { downloadVersion } from '../../../../utils/download'
import { instanceExists } from '../../../../utils/instanceManager'
import VersionWrapper, { IVersion } from '../../../../utils/version'
import { FC, useEffect, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { os } from '@tauri-apps/api'

interface INewInstance {
	name: string
	version: string
}

const Form: FC = () => {
	console.log('Form Render')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<INewInstance>()

	const createBtnRef = useRef<HTMLButtonElement>(null)
	const progressRef = useRef<HTMLProgressElement>(null)

	const [versions, setVersions] = useState<IVersion[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const versionWrapper = new VersionWrapper()
		const getVersions = async () => {
			const platform = await os.platform()
			let releases: IVersion[] = []

			if (platform === 'win32') releases = versionWrapper.getWindowsVersions()
			else if (platform === 'linux') releases = versionWrapper.getLinuxVersions()

			setVersions(releases)
			setIsLoading(false)
		}
		versionWrapper.updateRepositories().then(() => getVersions())
	}, [])

	const onSubmit: SubmitHandler<INewInstance> = data => {
		console.log('data', data)

		instanceExists(data.name).then(value => {
			if (!value) {
				if (createBtnRef.current) createBtnRef.current.disabled = true
				if (progressRef.current) progressRef.current.value = 50

				downloadVersion(
					versions.find(ver => ver.url == data?.version)!,
					data.name,
				).then(() => {
					if (createBtnRef.current) createBtnRef.current.disabled = false
					if (progressRef.current) progressRef.current.value = 100
				})
			}
		})
	}

	// useEffect(() => {
	// 	const unSubscribe = listen('update-version-download-progress', event => {
	// 		console.log('Событие update_process:', event.payload)
	// 		if (progressBarRef.current)
	// 			// @ts-expect-error message: any хотя должно быть string
	// 			progressBarRef.current.innerText = event.payload.message
	// 	})

	// 	return () => {
	// 		unSubscribe.then(unsub => unsub())
	// 	}
	// }, [])

	return (
		<div className='flex w-full h-full justify-center items-center'>
			<form className='flex flex-col w-1/3' onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('name', {
						required: 'Заполните это поле!',
						maxLength: 12,
					})}
					type='text'
					placeholder='Введите имя инстанса'
					className='input input-bordered input-primary w-full my-2'
				/>
				{errors?.name && (
					<div className='text-error my-1'>{errors.name.message}</div>
				)}

				<select
					{...register('version', {
						required: 'Заполните это поле!',
					})}
					className={`select select-primary w-full my-2`}
					title='select'
					disabled={isLoading}
					defaultValue=''
				>
					<option value='' disabled>
						Выберите версию игры
					</option>
					{versions.map(version => (
						<option value={version.url} key={version.url}>
              {`${version.repository.name} ${version.name}`}
						</option>
					))}
				</select>

				{errors?.version && (
					<div className='text-error my-1'>{errors.version.message}</div>
				)}

				<progress
					className='progress progress-success my-2'
					value={0}
					max='100'
					ref={progressRef}
				></progress>

				<button
					className='btn btn-primary my-2'
					ref={createBtnRef}
					type='submit'
				>
					Создать
				</button>
			</form>
		</div>
	)
}

export default Form
