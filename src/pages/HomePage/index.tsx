import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { FC, useEffect } from 'react'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { items } from '../../components/Sidebar/data'

const HomePage: FC = () => {
	console.log('HomePage Render')

	const navigate = useNavigate()
	const settingsContext = useSettingsContext()
	useEffect(() => {
		if (settingsContext.tabID !== 0) {
			navigate(items[settingsContext.tabID].link)
			console.log('page changed to:', items[settingsContext.tabID].link)
		}
	}, [])
	return (
		<div className={styles['container']}>
			<h1>
				<p className={'violet-text ' + styles['inline']}>Привет!</p>{' '}
				<p className={styles['inline']}>Давай</p>
			</h1>
			<h1>
				<p className={styles['inline']}>скорей начнем</p>{' '}
				<p className={'violet-text ' + styles['inline']}>играть!</p>
			</h1>
			<div className={styles['btn-container']}>
				<button
					className={'black-style violet-bg ' + styles['mods-btn']}
					onClick={() => {
						navigate('/mods') // переходим на страницу mods
						settingsContext.setTab(2) // делаем 2 страницу активной
					}}
				>
					Моды
				</button>
				<button
					className={'black-style green-bg ' + styles['versions-btn']}
					onClick={() => {
						navigate('/versions') // переходим на страницу versions
						settingsContext.setTab(1) // делаем 1 страницу активной
					}}
				>
					Версии
				</button>
			</div>
		</div>
	)
}

export default HomePage
