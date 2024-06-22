import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useMemo,
	useEffect,
} from 'react'
import { getValue, setValue } from '../utils/localStorage'
import TranslatableText from '../utils/TranslatableText'

export interface ISettingsContext {
	theme: string
	translation: TranslatableText
	homePageAnimation: number
	hideLauncherOnLaunchGame: boolean
	tabId: number
	setTheme: (value: string) => void
	setTranslation: (value: TranslatableText) => void
	setHomeAnimation: (value: number) => void
	setHideLauncher: (value: boolean) => void
	setTab: (value: number) => void
	resetSettings: () => void
}

export const SettingsContext = createContext<ISettingsContext>({
	theme: 'dark',
	translation: new TranslatableText(),
	homePageAnimation: 0,
	hideLauncherOnLaunchGame: false,
	tabId: 0,

	setTheme: () => {},
	setTranslation: () => {},
	setHomeAnimation: () => {},
	setHideLauncher: () => {},
	setTab: () => {},
	resetSettings: () => {},
})

export const useSettingsContext = () => useContext(SettingsContext)

export default function SettingsProvider({
	children,
}: {
	children: ReactNode
}) {
	console.log('SettingsProvider Render')

	const [theme, setTheme] = useState<string>(getValue('theme') || 'dark')
	const [translation, setTranslation] = useState<TranslatableText>(
		new TranslatableText()
	)
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
			translation,
			homePageAnimation,
			hideLauncherOnLaunchGame,
			tabId,
			setTheme,
			setTranslation,
			setHomeAnimation,
			setHideLauncher,
			setTab,
			resetSettings,
		}),
		[theme, translation, tabId]
	)

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}
