import Theme from '../../components/Theme'
import { themes } from '../../constants'
import { useSettingsContext } from '../../contexts/SettingsProvider'

export default function Settings() {
	const settingsContext = useSettingsContext()

	return (
		<>
			<div className='flex flex-row flex-wrap gap-3 p-10'>
				{themes.map(val => (
					<Theme
						name={val}
						activeTheme={settingsContext.theme}
						setTheme={settingsContext.setTheme}
						key={val}
					/>
				))}
			</div>
		</>
	)
}
