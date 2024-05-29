import { FC, useEffect, useRef, useState } from 'react'
import styles from './NewVersionForm.module.scss'
// import types from './NewVersionForm.interface.ts'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ISelectableVersion } from '../../../../components/VersionSelect/VersionSelect.interface'
import { instanceExists } from '../../../../utils/versionManager'
import { downloadVersion } from '../../../../utils/download'
import { listen } from '@tauri-apps/api/event'
import Fields from './components/Fields'

const NewVersionForm: FC = () => {
	console.log('NewVersionForm Render')

	const [existsVersion, setExistsVersion] = useState<boolean>(false)
	const [currentVersion, setCurrentVersion] =
		useState<ISelectableVersion>(Object)
	const [versionChanged, setVersionChanged] = useState<boolean>(true)

	const createBtnRef = useRef<HTMLButtonElement>(null)
	const progressBarRef = useRef<HTMLInputElement>(null)

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ISelectableVersion>()

	const onSubmit: SubmitHandler<ISelectableVersion> = data => {
		console.log(currentVersion)
		if (currentVersion.value) {
			setVersionChanged(true)
			instanceExists(data.label).then(value => {
				if (!value) {
					if (createBtnRef.current) createBtnRef.current.disabled = true
					if (progressBarRef.current)
						progressBarRef.current.innerText = 'Загрузка началась'

					downloadVersion(currentVersion.value, data.label, currentVersion.label).then(() => {
						if (createBtnRef.current) createBtnRef.current.disabled = false
						if (progressBarRef.current)
							progressBarRef.current.innerText = 'Загружено'
					})
					setExistsVersion(value)
				} else setExistsVersion(true)
			})
		} else {
			setVersionChanged(false)
		}
	}

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

	return (
		<form
			className={`black-style ${styles['form']}`}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Fields
				NewVersionNameInputProps={{ register, errors, existsVersion }}
				NewVersionSelectProps={{ versionChanged, setCurrentVersion }}
			/>

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
	)
}

export default NewVersionForm
