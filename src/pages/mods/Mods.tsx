import { useEffect, useState } from 'react'
import styles from './Mods.module.scss'
import ModWrapper from '../../utils/mod'

export default function Mods() {
	const [mods, setMods] = useState([])
	useEffect(() => {
		const modWrapper = new ModWrapper()
		modWrapper.getMods().then(response => {
			console.log(response.data.data)
			setMods(response.data.data)
		})
	}, [])
	return (
		<div className={'black-style ' + styles['container']}>
			<div className={styles['search-container']}>
				<input
					className={'black-style ' + styles['search-input']}
					type='text'
					placeholder='Введите поисковой запрос'
				/>
				<button className={'black-style ' + styles['search-btn']} type='submit'>
					Искать
				</button>
			</div>
			<div className='mods'>
				{mods.length ? mods.map(mod => {
					console.log(mod)
					return <></>
				}) : <></>}
			</div>
		</div>
	)
}
