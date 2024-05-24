import { FC, useEffect, useRef, useState } from 'react'
import VersionSelect from '../../components/VersionSelect'
import styles from './ChangeVersionModal.module.scss'
import { IChangeVersionProps } from './ChangeVersionModal.interface'
import { listen } from '@tauri-apps/api/event'
import { ISelectableVersion } from '../../components/VersionSelect/VersionSelect.interface'
import { modExists } from '../../utils/mod/index.ts'
import { getInstalledInstances } from '../../utils/versionManager'
import { downloadMod } from '../../utils/download'

const ChangeVersionModal: FC<IChangeVersionProps> = ({
	active,
	mod,
	setActive,
}) => {
	const [existsMod, setExistsMod] = useState<boolean>(false)
	const [version, setVersion] = useState<ISelectableVersion>(Object)
	const [versionChanged, setVersionChanged] = useState<boolean>(true)

	const progressBarRef = useRef<HTMLParagraphElement>(null)
	const addBtnRef = useRef<HTMLButtonElement>(null)

	useEffect(() => {
		// Проверка, существует ли мод с таким id
		modExists(version.label, String(mod.id)).then(value => {
			setExistsMod(value)
		})
		// Подписываемся на событие для получения прогресса загрузки мода
		const unSubscribe = listen('update-mod-download-progress', event => {
			console.log('Событие update_process:', event.payload)
			if (progressBarRef.current)
				// @ts-expect-error message: any хотя должно быть string
				progressBarRef.current.innerText = event.payload.message
		})

		//Отписываемся от событий
		return () => {
			unSubscribe.then(unsub => unsub())
		}
	}, [])

	// Подгрузка версий
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [versions, setVersions] = useState<ISelectableVersion[]>([])

	useEffect(() => {
		getInstalledInstances().then(value => {
			const entries: ISelectableVersion[] = value.map(version => ({
				label: String(version.name),
				value: String(version.name),
			}))
			console.log('entries:', entries)
			setVersions(entries)
			setIsLoading(false)
		})
	}, [])

	const onSubmit = () => {
		console.log(version)

		if (!version.value) {
			setVersionChanged(false)
		} else {
			modExists(version.value, String(mod.id)).then(value => {
				console.log(value, version, mod.id, mod.downloadUrl)

				if (addBtnRef.current) if (!value) addBtnRef.current.disabled = true

				downloadMod(mod.downloadUrl, version.value, String(mod.id)).then(() => {
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
				active ? `${styles['modal']} ${styles['active']}` : styles['modal']
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

export default ChangeVersionModal
