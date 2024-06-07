import { FC, useEffect, useState } from 'react'
import Tab from '../../Tab'
import ThemeElement from '../../ThemeElement'
import OptionGroup from '../../OptionGroup'
import { useSettingsContext } from '../../../../../contexts/SettingsProvider'
import themes from '../../../../../utils/themes'
import { ITabProps } from '../tab.types'

const LauncherTab: FC<ITabProps> = ({ currentTab, setCurrentTab }) => {
	const [currentTheme, setCurrentTheme] = useState<string>('dark')
	const settingsContext = useSettingsContext()

	useEffect(() => {
		setCurrentTheme(settingsContext.theme)
	}, [settingsContext.theme])

	return (

			<Tab
				title='Лаунчер'
				id={0}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
			>
				<div className='form-control'>
					<label className='label cursor-pointer'>
						<span className='label-text'>
							Скрывать лаунчер при запуске игры
						</span>
						<input
							type='checkbox'
							defaultChecked
							className='checkbox checkbox-primary'
						/>
					</label>
					<h2 className='text-lg my-1'>Другие опции</h2>
					<OptionGroup title='Тема' styles='bg-base-300'>
						<label className='swap flex flex-row justify-between'>
							<div className='rounded-box p-1 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
								{themes.map(theme => {
									return (
										<ThemeElement
											key={theme}
											currentTheme={currentTheme}
											theme={theme}
											onClick={() => {
												settingsContext.setTheme(theme)
												setCurrentTheme(theme)
											}}
										/>
									)
								})}
							</div>
						</label>
					</OptionGroup>
				</div>
			</Tab>
	)
}

export default LauncherTab
