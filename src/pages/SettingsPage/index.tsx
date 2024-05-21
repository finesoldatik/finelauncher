import { FC, useEffect, useRef } from 'react'
import GreatContribution from './components/GreatContribution'
import ProductsUsed from './components/ProductsUsed'
import styles from './SettingsPage.module.scss'
import { useSettingsContext } from '../../contexts/SettingsProvider'

const SettingsPage: FC = () => {
	const settingsContext = useSettingsContext()
	const hideLauncherChecboxRef = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (hideLauncherChecboxRef.current) {
			hideLauncherChecboxRef.current.checked =
				settingsContext.settings.hideLauncherOnLaunchGame
		}
	}, [])
	return (
		<div className={styles['container']}>
			<div className={`black-style ${styles['settings']}`}>
				<h2>Настройки</h2>
				<div>
					<label>Скрывать лаунчер при запуске игры </label>
					<input
						ref={hideLauncherChecboxRef}
						onChange={() => {
							if (hideLauncherChecboxRef.current) {
								settingsContext.setHideLauncherOnLaunchGame(
									hideLauncherChecboxRef.current.checked
								)
							}
						}}
						type='checkbox'
						placeholder='Скрывать лаунчер при запуске игры'
					/>
				</div>
			</div>
			<GreatContribution />
			<ProductsUsed />
		</div>
	)
}

export default SettingsPage
