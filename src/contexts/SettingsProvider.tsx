import {
	createContext,
	useState,
	useContext,
	ReactNode,
	useMemo,
	useEffect,
} from 'react'
import { getValue, setValue } from '../services/localStorage'
import TranslatableText from '../services/translatableText'

export interface ISettingsContext {
	theme: string
	translation: TranslatableText
	currentPage: string
	hideLauncherOnLaunchGame: boolean

	setTheme: (value: string) => void
	setTranslation: (value: TranslatableText) => void
	setPage: (value: string) => void
	setHideLauncherOnLaunchGame: (value: boolean) => void
	resetSettings: () => void
}

export const SettingsContext = createContext<ISettingsContext>({
	theme: 'dark',
	translation: new TranslatableText(),
	currentPage: '/',
	hideLauncherOnLaunchGame: false,

	setTheme: () => {},
	setTranslation: () => {},
	setPage: () => {},
	setHideLauncherOnLaunchGame: () => {},
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
	const [currentPage, setCurrentPage] = useState<string>('/')

	const [hideLauncherOnLaunchGame, setHideLauncherOnLaunchGame] =
		useState<boolean>(getValue('hideLauncherOnLaunchGame') || false)

	const resetSettings = () => {
		setHideLauncherOnLaunchGame(false)
	}

	const setHideLauncher = (value: boolean) => {
		setValue('hideLauncherOnLaunchGame', value)
		setHideLauncherOnLaunchGame(value)
	}

	const setPage = (value: string) => {
		setValue('page', value)
		setCurrentPage(value)
	}

	useEffect(() => {
		const page = String(getValue('page'))
		console.log('SAVED_PAGE:', page)
		setPage(page)
	}, [])

	useEffect(() => {
		document.body.setAttribute('data-theme', theme)
		setValue('theme', theme)
	}, [theme])

	const value = useMemo(
		() => ({
			theme,
			translation,
			hideLauncherOnLaunchGame,
			currentPage,
			setTheme,
			setTranslation,
			setHideLauncherOnLaunchGame: setHideLauncher,
			setPage,
			resetSettings,
		}),
		[theme, translation, currentPage]
	)

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}
