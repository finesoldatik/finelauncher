import { FC, useEffect, useState } from 'react'
import Tab from '../../Tab'
import ThemeElement from '../../ThemeElement'
import OptionGroup from '../../OptionGroup'
import { useSettingsContext } from '../../../../../contexts/SettingsProvider'
import themes from '../../../../../utils/themes'
import { ITabProps } from '../tab.types'
import Option from '../../Option'
import Select from '../../../../../components/Select'

const LauncherTab: FC<ITabProps> = ({ currentTab, setCurrentTab }) => {
	console.log('LauncherTab Render')

	const [currentTheme, setCurrentTheme] = useState<string>('dark')
	const settingsContext = useSettingsContext()

	useEffect(() => {
		setCurrentTheme(settingsContext.theme)
	}, [settingsContext.theme])

	return (
		<Tab
			title={settingsContext.translation.translatable(
				'settingsPage.launcherOptions'
			)}
			id={0}
			currentTab={currentTab}
			setCurrentTab={setCurrentTab}
		>
			<Option
				title={settingsContext.translation.translatable(
					'settingsPage.launcherOptions.hideLauncherOnLaunchGame'
				)}
				value={settingsContext.hideLauncherOnLaunchGame}
				setOption={value => {
					console.log(value)
					settingsContext.setHideLauncher(value)
				}}
			/>
			<Option
				title={
					settingsContext.translation.translatable(
						'settingsPage.launcherOptions.homePageAnimation'
					) + ' (BETA)'
				}
				value={Boolean(settingsContext.homePageAnimation)}
				setOption={value => {
					console.log(value)
					settingsContext.setHomeAnimation(Number(value))
				}}
			/>
			<div className='form-control'>
				<label className='label cursor-pointer'>
					<span className='label-text'>
						{settingsContext.translation.translatable(
							'settingsPage.launcherOptions.language'
						)}
					</span>
					<Select
						title={settingsContext.translation.translatable(
							'settingsPage.launcherOptions.language.select'
						)}
						options={settingsContext.translation
							.getLanguageNames()
							.map(value => ({ label: value.name, value: value.id }))}
						setChangedValue={value => {
							console.log('lang:', value)
							settingsContext.translation.setLanguage(value.value)
							window.location.reload()
						}}
						defaultValue={settingsContext.translation.language}
						styles='max-w-48'
					/>
				</label>
			</div>
			<h2 className='text-lg my-1'>
				{settingsContext.translation.translatable(
					'settingsPage.launcherOptions.otherOptions'
				)}
			</h2>
			<OptionGroup
				title={settingsContext.translation.translatable(
					'settingsPage.launcherOptions.theme'
				)}
				styles='bg-base-300'
			>
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
		</Tab>
	)
}

export default LauncherTab
