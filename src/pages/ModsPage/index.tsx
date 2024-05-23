import { FC, useEffect, useState } from 'react'
import styles from './ModsPage.module.scss'
import ModWrapper from '../../utils/mod/Wrapper'
import { IMods } from './ModsPage.interface'
import Mod from './components/Mod'
import SearchMods from './components/SearchMods'

const modWrapper = new ModWrapper()

const ModsPage: FC = () => {
	const [mods, setMods] = useState<IMods>(Object)

	useEffect(() => {
		modWrapper.getMods({ params: { item_count: 1000 } }).then(response => {
			console.log(response.data.data)
			setMods(response.data.data)
		})
	}, [])

	return (
		<div className={`black-style ${styles['container']}`}>
			<SearchMods modWrapper={modWrapper} setMods={setMods} />

			<div className={styles['mods']}>
				{mods.content ? (
					mods.content.map(mod => {
						return <Mod mod={mod} setMods={setMods} key={mod.id} />
					})
				) : (
					<h2>
						Моды загружаются. Проверьте правильность поискового
						запроса/подключение к интернету если они не были загружены.
					</h2>
				)}
			</div>
		</div>
	)
}

export default ModsPage
