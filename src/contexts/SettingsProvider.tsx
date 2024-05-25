import { createContext, useState, useContext, ReactNode, useMemo } from 'react'
import { getValue, setValue } from '../utils/localStorage'

interface ISettingsContext {
	setOption: (value: boolean, key: string) => void
	settings: ISettings
	tabID: number
	setTab: (value: number) => void
}

export const SettingsContext = createContext<ISettingsContext>({
	setOption: () => {},
	settings: {
		hideLauncherOnLaunchGame: false,
	},
	tabID: 0,
	setTab: () => {},
})

export const useSettingsContext = () => useContext(SettingsContext)

interface ISettings {
	hideLauncherOnLaunchGame: boolean
}

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [tabID, setTabID] = useState<number>(() => getValue('tabID') || 0)
	const [settings, setSettings] = useState<ISettings>({
		hideLauncherOnLaunchGame: getValue('hideLauncherOnLaunchGame') || false,
	})

	const setOption = (value: any, key: string) => {
		setSettings(prev => ({ ...prev, [key]: value }))
		setValue(value, key)
	}

	const setTab = (value: number) => {
		setOption(value, 'tabID')
		setTabID(value)
	}

	const value = useMemo(
		() => ({
			setOption,
			settings,
			tabID,
			setTab,
		}),
		[settings, tabID]
	)

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}
