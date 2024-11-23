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
	background: string
	hideLauncherOnLaunchGame: boolean

	setTheme: React.Dispatch<React.SetStateAction<string>>
	setTranslation: React.Dispatch<React.SetStateAction<TranslatableText>>
	setPage: (value: string) => void
	setBackground: React.Dispatch<React.SetStateAction<string>>
	setHideLauncherOnLaunchGame: React.Dispatch<React.SetStateAction<boolean>>
	resetSettings: () => void
}

export const SettingsContext = createContext<ISettingsContext>({
	theme: 'dark',
	translation: new TranslatableText(),
	currentPage: '',
	background: '',
	hideLauncherOnLaunchGame: false,

	setTheme: () => {},
	setTranslation: () => {},
	setPage: () => {},
	setBackground: () => {},
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
	const [currentPage, setCurrentPage] = useState<string>('')

	const [background, setBackground] = useState<string>(
		getValue('background') || 'day_1'
	)

	const [hideLauncherOnLaunchGame, setHideLauncherOnLaunchGame] =
		useState<boolean>(getValue('hideLauncherOnLaunchGame') || false)

	const resetSettings = () => {
		setHideLauncherOnLaunchGame(false)
		setTheme('dark')
	}

	const setPage = (value: string) => {
		setValue('page', value)
		setCurrentPage(value)
	}

	useEffect(() => {
		const value = getValue('page')
		if (value != null) {
			const page = String(value)
			console.log('SAVED_PAGE:', page)
			setPage(page)
		} else {
			setPage('/')
		}
	}, [])

	useEffect(() => {
		document.body.setAttribute('data-theme', theme)
		setValue('theme', theme)
	}, [theme])

	useEffect(() => {
		setValue('hideLauncherOnLaunchGame', hideLauncherOnLaunchGame)
	}, [hideLauncherOnLaunchGame])

	useEffect(() => {
		setValue('background', background)
	}, [background])

	const value = useMemo(
		() => ({
			theme,
			translation,
			currentPage,
			background,
			hideLauncherOnLaunchGame,

			setTheme,
			setTranslation,
			setPage,
			setBackground,
			setHideLauncherOnLaunchGame,
			resetSettings,
		}),
		[theme, translation, currentPage, background]
	)

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}
