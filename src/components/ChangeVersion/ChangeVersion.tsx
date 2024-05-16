import { FC, useEffect, useRef, useState } from 'react'
import VersionSelect from '../VersionSelect/VersionSelect'
import styles from './ChangeVersion.module.scss'
import { ChangeVersionProps } from './interface'
import { listen } from '@tauri-apps/api/event'
import api from '../../api'

const ChangeVersion: FC<ChangeVersionProps> = ({ active, mod, setActive }) => {
	const [existsMod, setExistsMod] = useState<boolean>(false)
	const [version, setVersion] = useState<string>('')
	const [versionChanged, setVersionChanged] = useState<boolean>(true)

	const progressBarRef = useRef<HTMLParagraphElement>(null)
	const addBtnRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		api.checkMod(version, String(mod.id)).then(value => {
			setExistsMod(value)
		})
		const unSubscribe = listen('update-mod-download-progress', event => {
			console.log('Событие update_process:', event.payload)
			if (progressBarRef.current)
				// @ts-expect-error message: any хотя должно быть string
				progressBarRef.current.innerText = event.payload.message
		})

		return () => {
			unSubscribe.then(unsub => unsub())
		}
	}, [])

	const onSubmit = () => {
		if (!version) {
			setVersionChanged(false)
		} else {
			api.checkMod(version, String(mod.id)).then(value => {
				console.log(value, version, mod.id, mod.downloadUrl)

				if (addBtnRef.current) if (!value) addBtnRef.current.disabled = true

				api.installMod(mod.downloadUrl, version, String(mod.id)).then(() => {
					if (addBtnRef.current) addBtnRef.current.disabled = false

					setActive(false)
				})
				setExistsMod(value)
			})
			setVersionChanged(true)
		}
	}

	return (
		<div
			className={
				active ? styles['modal'] + ' ' + styles['active'] : styles['modal']
			}
			onClick={() => setActive(false)}
		>
			<div className={styles['content']} onClick={e => e.stopPropagation()}>
				{existsMod ? (
					<>
						<p className='error-text'>Мод с таким именем уже существует!</p>
						<button className='black-style' onClick={() => setActive(false)}>
							Вернуться
						</button>
					</>
				) : (
					<>
						<h3 className={styles['mb-10']}>
							Выберите версию для установки мода:{' '}
						</h3>

						<VersionSelect setVersion={setVersion} />

						{versionChanged ? (
							<></>
						) : (
							<p className='error-text'>Выберите версию!</p>
						)}

						<p
							className={'black-style ' + styles['progressbar']}
							ref={progressBarRef}
						>
							Прогресс Бар
						</p>

						<button
							className={'black-style ' + styles['add-btn']}
							ref={addBtnRef}
							onClick={() => onSubmit()}
						>
							Создать
						</button>
					</>
				)}
			</div>
		</div>
	)
}

export default ChangeVersion
