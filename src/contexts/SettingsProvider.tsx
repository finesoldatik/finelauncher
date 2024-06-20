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
	homePageAnimation: number
	hideLauncherOnLaunchGame: boolean
	tabId: number
	setTab: (value: number) => void
	setTheme: (value: string) => void
	setHomeAnimation: (value: number) => void
	setHideLauncher: (value: boolean) => void
	resetSettings: () => void
}

export const SettingsContext = createContext<ISettingsContext>({
	theme: 'dark',
	homePageAnimation: 0,
	hideLauncherOnLaunchGame: false,
	tabId: 0,
	setTab: () => {},
	setTheme: () => {},
	setHomeAnimation: () => {},
	setHideLauncher: () => {},
	resetSettings: () => {},
})

export const useSettingsContext = () => useContext(SettingsContext)

export default function SettingsProvider({
	children,
}: {
	children: ReactNode
}) {
	const [theme, setTheme] = useState<string>(getValue('theme') || 'dark')
	const [tabId, setTabId] = useState<number>(0)
	const [homePageAnimation, setHomePageAnimation] = useState(
		getValue('homePageAnimation') || 0
	)
	const [hideLauncherOnLaunchGame, setHideLauncherOnLaunchGame] = useState(
		getValue('hideLauncherOnLaunchGame') || false
	)

	const resetSettings = () => {
		setHomePageAnimation(0)
		setHideLauncherOnLaunchGame(false)
	}

	const setHomeAnimation = (value: number) => {
		setOption(value, 'homePageAnimation')
		setHomePageAnimation(value)
	}

	const setHideLauncher = (value: boolean) => {
		setOption(value, 'hideLauncherOnLaunchGame')
		setHideLauncherOnLaunchGame(value)
	}

	const setOption = (value: any, key: string) => {
		setValue(value, key)
	}

	const setTab = (value: number) => {
		setOption(value, 'tabId')
		setTabId(value)
	}

	useEffect(() => {
		setTab(Number(getValue('tabId')))
	}, [])

	useEffect(() => {
		document.body.setAttribute('data-theme', theme)
		setValue(theme, 'theme')
	}, [theme])

	const value = useMemo(
		() => ({
			theme,
			homePageAnimation,
			hideLauncherOnLaunchGame,
			tabId,
			setTab,
			setTheme,
			setHomeAnimation,
			setHideLauncher,
			resetSettings,
		}),
		[theme, tabId]
	)

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}
