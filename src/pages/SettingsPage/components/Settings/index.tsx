import { FC } from 'react'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'
import styles from './Settings.module.scss'
import Option from './components/Option'

const Settings: FC = () => {
	console.log('Settings Render')

	const settingsContext = useSettingsContext()

	return (
		<div className={`black-style no-selectable ${styles['container']}`}>
			<h2>Настройки</h2>
			<Option
				label='Скрывать лаунчер при запуске игры'
				value={settingsContext.settings.hideLauncherOnLaunchGame}
				setOption={settingsContext.changeSettings}
			/>
		</div>
	)
}

export default Settings
