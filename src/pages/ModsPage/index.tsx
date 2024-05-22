import { FC, useEffect, useRef, useState } from 'react'
import styles from './ModsPage.module.scss'
import ModWrapper from '../../utils/mod/Wrapper'
import { IMods } from './ModsPage.interface'
import Mod from './components/Mod'
import { getModsBySearchQuery } from '../../utils/mod/index.ts'

const ModsPage: FC = () => {
	const [mods, setMods] = useState<IMods>(Object)
	const searchInputRef = useRef<HTMLInputElement>(null)

	const modWrapper = new ModWrapper()

	useEffect(() => {
		modWrapper.getMods({ params: { item_count: 1000 } }).then(response => {
			console.log(response.data.data)
			setMods(response.data.data)
		})
	}, [])

	return (
		<div className={'black-style ' + styles['container']}>
			<div className={styles['search-container']}>
				<input
					className={'black-style ' + styles['search-input']}
					ref={searchInputRef}
					type='text'
					placeholder='Введите отрывок/название мода'
				/>
				<button
					className={'black-style ' + styles['search-btn']}
					onClick={() => {
						if (searchInputRef.current)
							getModsBySearchQuery(
								modWrapper,
								setMods,
								searchInputRef.current.value
							)
					}}
				>
					Искать
				</button>
			</div>
			<div className={styles['mods']}>
				{mods.content ? (
					mods.content.map(mod => {
						return <Mod mod={mod} setMods={setMods} key={mod.id} />
					})
				) : (
					<h2>
						Моды загружаются или не найдены. Проверьте правильность поискового
						запроса/подключение к интернету, если они не загрузились.
					</h2>
				)}
			</div>
		</div>
	)
}

export default ModsPage
