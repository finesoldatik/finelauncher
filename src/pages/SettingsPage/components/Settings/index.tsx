import { FC } from 'react'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'
import styles from './Settings.module.scss'
import Option from './components/Option'

const Settings: FC = () => {
	const settingsContext = useSettingsContext()

	console.log('Settings Render')

	return (
		<div className={`black-style ${styles['container']}`}>
			<h2>Настройки</h2>
			<Option
				label='Скрывать лаунчер при запуске игры'
				value={settingsContext.settings.hideLauncherOnLaunchGame}
				setOption={settingsContext.setHideLauncherOnLaunchGame}
			/>
		</div>
	)
}

export default Settings
