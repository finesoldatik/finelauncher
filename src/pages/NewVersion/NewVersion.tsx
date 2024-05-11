import { SubmitHandler, useForm } from 'react-hook-form'
import VersionSelect from '../../components/version-select/VersionSelect'
import api from '../../api'
import { useState, useEffect, useRef } from 'react'
import { INewVersion } from './NewVersion.interface'

import { listen } from '@tauri-apps/api/event'

export default function NewVersion() {
	const [existsVersion, setExistsVersion] = useState<boolean>(false)
	const [version, setVersion] = useState<string>('')
	const [versionChanged, setVersionChanged] = useState<boolean>(true)
	const progressBarRef = useRef<HTMLParagraphElement>(null)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<INewVersion>()

	useEffect(() => {
		// api.getProgress(progressBarRef).then(unSubscribe => {
		// 	unSubscribe()
		// })

		// // Подписываемся на событие
		// const getProgress = async progressBarRef => {
		const unSubscribe = listen('update-progress', event => {
			console.log('Событие update_process:', event.payload)
			progressBarRef.current.innerText = event.payload.message // Вопросительный знак убрал
		})
		// return unSubscribe
		// }

		// getProgress(progressBarRef).then(unsub => {
		// 	console.log(unsub)
		// 	unsub()
		// })
		return () => {
			unSubscribe.then(unsub => unsub())
		}
	}, [])

	const onSubmit: SubmitHandler<INewVersion> = data => {
		if (!version) {
			setVersionChanged(false)
		} else {
			api.checkVersion(data.name).then(value => {
				if (!value) api.installVersion(version, data.name)
				setExistsVersion(value)
			})
			setVersionChanged(true)
		}
	}

	return (
		<form
			className='default'
			style={{
				backgroundColor: '#111',
				width: 300,
				cursor: 'default',
				margin: 'auto',
			}}
			onSubmit={handleSubmit(onSubmit)}
		>
			<p style={{ marginTop: 10 }}>* Обязательное поле</p>
			<p className='violet-text'>Не длинее 12 символов</p>

			<input
				{...register('name', {
					required: 'Заполните это поле!',
					maxLength: 12,
				})}
				className='default'
				type='text'
				style={{ cursor: 'text', marginTop: 10 }}
				placeholder='Введите имя версии'
			/>

			{errors?.name && <div className='error-text'>{errors.name.message}</div>}

			{existsVersion ? (
				<p className='error-text'>Версия с таким именем уже существует!</p>
			) : (
				<></>
			)}

			<p style={{ marginTop: 10 }}>* Обязательное поле</p>
			<p className='violet-text' style={{ marginBottom: 10 }}>
				Выберите версию
			</p>

			<div>
				<VersionSelect setVersion={setVersion} />
			</div>

			{versionChanged ? <></> : <p className='error-text'>Выберите версию!</p>}

			<p
				className='default'
				style={{
					backgroundColor: '#514B9E',
					marginTop: 20,
					textAlign: 'center',
				}}
				ref={progressBarRef}
			>
				Прогресс Бар
			</p>

			<button
				className='default'
				style={{
					backgroundColor: '#34653A',
					width: '100%',
					marginTop: 15,
					marginBottom: 10,
				}}
				type='submit'
			>
				Создать
			</button>
		</form>
	)
}
