'use client'
import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useMemo,
	useEffect,
} from 'react'
import { getValue, setValue } from '../utils/localStorage'

interface ISettingsContext {
	theme: string
	setTheme: (value: string) => void
	changeSettings: (optionGroup: string, key: string, value: any) => void
	resetSettings: () => void
	settings: ISettings
	tabId: number
	setTab: (value: number) => void
}

export const defaultSettings = {
	launcher: {
		homePageAnimation: 0,
		hideLauncherOnLaunchGame: false,
	},
}

interface ISettings {
	launcher: {
		homePageAnimation: number
		hideLauncherOnLaunchGame: boolean
	}
}

export const SettingsContext = createContext<ISettingsContext>({
	theme: 'dark',
	setTheme: () => {},
	changeSettings: () => {},
	resetSettings: () => {},
	settings: defaultSettings,
	tabId: 0,
	setTab: () => {},
})

export const useSettingsContext = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [theme, setTheme] = useState<string>(getValue('theme') || 'dark')
	const [tabId, setTabId] = useState<number>(0)
	const [settings, setSettings] = useState<ISettings>(
		getValue('settings') || defaultSettings
	)

	const changeSettings = (optionGroup: string, key: string, value: any) => {
		setSettings(prev => {
			console.log({ ...prev, [optionGroup]: { [key]: value } })
			setOption({ ...prev, [optionGroup]: { [key]: value } }, 'settings')
			// @ts-expect-error получение объекта optionGroup из prev, но ругается, что optionGroup строка..
			return { ...prev, [optionGroup]: { ...prev[optionGroup], [key]: value } }
		})
	}

	const resetSettings = () => {
		setSettings(defaultSettings)
	}

	const setOption = (value: any, key: string) => {
		setValue(value, key)
	}

	const setTab = (value: number) => {
		setOption(value, 'tabId')
		setTabId(value)
	}

	useEffect(() => {
		setTab(getValue('tabId'))
	}, [])

	useEffect(() => {
		setValue(settings, 'settings')
	}, [settings])

	useEffect(() => {
		document.body.setAttribute('data-theme', theme)
		setValue(theme, 'theme')
	}, [theme])

	const value = useMemo(
		() => ({
			theme,
			setTheme,
			changeSettings,
			resetSettings,
			settings,
			tabId,
			setTab,
		}),
		[theme, settings, tabId]
	)

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}
