import { SubmitHandler, useForm } from 'react-hook-form'
import VersionSelect from '../../components/versionSelect/VersionSelect'
import api from '../../api'
import { useState, useEffect, useRef } from 'react'
import { INewVersion } from './interface'
import styles from './NewVersion.module.scss'

import { listen } from '@tauri-apps/api/event'

export default function NewVersion() {
	const [existsVersion, setExistsVersion] = useState<boolean>(false)
	const [version, setVersion] = useState<string>('')
	const [versionChanged, setVersionChanged] = useState<boolean>(true)
	const progressBarRef = useRef<HTMLParagraphElement>(null)
	const createBtnRef = useRef<HTMLParagraphElement>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<INewVersion>()

	useEffect(() => {
		const unSubscribe = listen('update-progress', event => {
			console.log('Событие update_process:', event.payload)
			progressBarRef.current.innerText = event.payload.message
		})

		return () => {
			unSubscribe.then(unsub => unsub())
		}
	}, [])

	const onSubmit: SubmitHandler<INewVersion> = data => {
		if (!version) {
			setVersionChanged(false)
		} else {
			api.checkVersion(data.name).then(value => {
				if (!value) createBtnRef.current.disabled = true
				api.installVersion(version, data.name).then(() => {
					createBtnRef.current.disabled = false
				})
				setExistsVersion(value)
			})
			setVersionChanged(true)
		}
	}

	return (
		<form
			className={'black-style ' + styles['container']}
			onSubmit={handleSubmit(onSubmit)}
		>
			<p className={styles['mt-10']}>* Обязательное поле</p>
			<p className='violet-text'>Не длинее 12 символов</p>

			<input
				{...register('name', {
					required: 'Заполните это поле!',
					maxLength: 12,
				})}
				className={'black-style ' + styles['name-input']}
				type='text'
				placeholder='Введите имя версии'
			/>

			{errors?.name && <div className='error-text'>{errors.name.message}</div>}

			{existsVersion ? (
				<p className='error-text'>Версия с таким именем уже существует!</p>
			) : (
				<></>
			)}

			<p className={styles['mt-10']}>* Обязательное поле</p>
			<p className={'violet-text ' + styles['mb-10']}>Выберите версию</p>

			<VersionSelect setVersion={setVersion} />

			{versionChanged ? <></> : <p className='error-text'>Выберите версию!</p>}

			<p
				className={'black-style ' + styles['progressbar']}
				ref={progressBarRef}
			>
				Прогресс Бар
			</p>

			<button
				className={'black-style ' + styles['create-btn']}
				ref={createBtnRef}
				type='submit'
			>
				Создать
			</button>
		</form>
	)
}
