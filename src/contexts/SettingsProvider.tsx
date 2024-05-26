import { createContext, useState, useContext, ReactNode, useMemo } from 'react'
import { getValue, setValue } from '../utils/localStorage'

interface ISettingsContext {
	changeSettings: (value: unknown, key: string) => void
	settings: ISettings
	tabID: number
	setTab: (value: number) => void
}

export const SettingsContext = createContext<ISettingsContext>({
	changeSettings: () => {},
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
	const [settings, setSettings] = useState<ISettings>(
		getValue('settings') || {
			hideLauncherOnLaunchGame: false,
		}
	)

	const changeSettings = (value: unknown, key: string) => {
		setSettings(prev => {
			setOption({ ...prev, [key]: value }, 'settings')
			return { ...prev, [key]: value }
		})
	}

	const setOption = (value: unknown, key: string) => {
		setValue(value, key)
	}

	const setTab = (value: number) => {
		setOption(value, 'tabID')
		setTabID(value)
	}

	const value = useMemo(
		() => ({
			changeSettings,
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
