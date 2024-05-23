import { SubmitHandler, useForm } from 'react-hook-form'
import VersionSelect from '../../components/VersionSelect'
import { useState, useEffect, useRef, FC } from 'react'
import styles from './NewVersionPage.module.scss'
import { listen } from '@tauri-apps/api/event'
import Util, { IVersion } from '../../utils/version/index'
import { os } from '@tauri-apps/api'
import { ISelectableVersion } from '../../components/VersionSelect/VersionSelect.interface'
import { instanceExists } from '../../utils/versionManager'
import { downloadVersion } from '../../utils/download'

const NewVersion: FC = () => {
	const [existsVersion, setExistsVersion] = useState<boolean>(false)
	const [version, setVersion] = useState<ISelectableVersion>(Object)
	const [versionChanged, setVersionChanged] = useState<boolean>(true)

	const progressBarRef = useRef<HTMLParagraphElement>(null)
	const createBtnRef = useRef<HTMLButtonElement>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISelectableVersion>()

	useEffect(() => {
		const unSubscribe = listen('update-version-download-progress', event => {
			console.log('Событие update_process:', event.payload)
			if (progressBarRef.current)
				// @ts-expect-error message: any хотя должно быть string
				progressBarRef.current.innerText = event.payload.message
		})

		return () => {
			unSubscribe.then(unsub => unsub())
		}
	}, [])

	const [versions, setVersions] = useState<ISelectableVersion[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	useEffect(() => {
		const versionWrapper = new Util()

		const getVersions = async () => {
			const platform = await os.platform()
			let releases: IVersion[] = []

			if (platform === 'win32') releases = versionWrapper.getWindowsVersions()
			else if (platform === 'linux')
				releases = versionWrapper.getLinuxVersions()

			const versionList = releases.map(version => ({
				label: `${version.repository} ${version.name}`,
				value: version.url,
			}))

			setVersions(versionList)
			setIsLoading(false)
		}
		versionWrapper.getRepositories().then(() => getVersions())
	}, [])

	const onSubmit: SubmitHandler<ISelectableVersion> = data => {
		if (!version) {
			setVersionChanged(false)
		} else {
			instanceExists(data.label).then(value => {
				if (!value)
					if (createBtnRef.current) createBtnRef.current.disabled = true
				downloadVersion(version.label, data.label).then(() => {
					if (createBtnRef.current) createBtnRef.current.disabled = false
				})
				setExistsVersion(value)
			})
			setVersionChanged(true)
		}
	}

	return (
		<div className={styles['container']}>
			<form
				className={`black-style ${styles['form']}`}
				onSubmit={handleSubmit(onSubmit)}
			>
				<p className={styles['mt-10']}>* Обязательное поле</p>
				<p className='violet-text'>Не длинее 12 символов</p>

				<input
					{...register('label', {
						required: 'Заполните это поле!',
						maxLength: 12,
					})}
					className={`black-style ${styles['name-input']}`}
					type='text'
					placeholder='Введите имя версии'
				/>

				{errors?.label && (
					<div className='error-text'>{errors.label.message}</div>
				)}

				{existsVersion ? (
					<p className='error-text'>Версия с таким именем уже существует!</p>
				) : (
					<></>
				)}

				<p className={styles['mt-10']}>* Обязательное поле</p>
				<p className={'violet-text ' + styles['mb-10']}>Выберите версию</p>

				<VersionSelect
					setVersion={setVersion}
					versions={versions}
					isLoading={isLoading}
				/>

				{versionChanged ? (
					<></>
				) : (
					<p className='error-text'>Выберите версию!</p>
				)}

				<p
					className={`black-style ${styles['progressbar']}`}
					ref={progressBarRef}
				>
					Прогресс Бар
				</p>

				<button
					className={`black-style ${styles['create-btn']}`}
					ref={createBtnRef}
					type='submit'
				>
					Создать
				</button>
			</form>
		</div>
	)
}

export default NewVersion
