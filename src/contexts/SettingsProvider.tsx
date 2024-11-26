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

export interface SettingsContext {
	theme: string
	translation: TranslatableText
	currentTab: number
	currentPage: string
	background: string
	hideLauncherOnLaunchGame: boolean
	fallingSnowflakes: boolean
	snowflakeCount: number

	setTheme: React.Dispatch<React.SetStateAction<string>>
	setTranslation: React.Dispatch<React.SetStateAction<TranslatableText>>
	setCurrentTab: React.Dispatch<React.SetStateAction<number>>
	setCurrentPage: React.Dispatch<React.SetStateAction<string>>
	setBackground: React.Dispatch<React.SetStateAction<string>>
	setHideLauncherOnLaunchGame: React.Dispatch<React.SetStateAction<boolean>>
	setFallingSnowflakes: React.Dispatch<React.SetStateAction<boolean>>
	setSnowflakeCount: React.Dispatch<React.SetStateAction<number>>
	resetSettings: () => void
}

export const SettingsContext = createContext<SettingsContext>({
	theme: 'dark',
	translation: new TranslatableText(),
	currentTab: 0,
	currentPage: '',
	background: '',
	hideLauncherOnLaunchGame: false,
	fallingSnowflakes: false,
	snowflakeCount: 0,

	setTheme: () => {},
	setTranslation: () => {},
	setCurrentTab: () => {},
	setCurrentPage: () => {},
	setBackground: () => {},
	setHideLauncherOnLaunchGame: () => {},
	setFallingSnowflakes: () => {},
	setSnowflakeCount: () => {},
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

	const [currentTab, setCurrentTab] = useState<number>(getValue('tab') || 0)

	const [currentPage, setCurrentPage] = useState<string>(
		getValue('page') || '/'
	)

	const [background, setBackground] = useState<string>(
		getValue('background') || 'day_1'
	)

	const [hideLauncherOnLaunchGame, setHideLauncherOnLaunchGame] =
		useState<boolean>(getValue('hideLauncherOnLaunchGame') || false)

	const [fallingSnowflakes, setFallingSnowflakes] = useState<boolean>(
		getValue('fallingSnowflakes') || false
	)

	const [snowflakeCount, setSnowflakeCount] = useState<number>(
		getValue('snowflakeCount') || 300
	)

	const resetSettings = () => {
		setTheme('dark')
		setBackground('day_1')
		setHideLauncherOnLaunchGame(false)
		setFallingSnowflakes(false)
	}

	useEffect(() => {
		setValue('tab', currentTab)
	}, [currentTab])

	useEffect(() => {
		setValue('page', currentPage)
	}, [currentPage])

	useEffect(() => {
		document.body.setAttribute('data-theme', theme)
		setValue('theme', theme)
	}, [theme])

	useEffect(() => {
		setValue('background', background)
	}, [background])

	useEffect(() => {
		setValue('hideLauncherOnLaunchGame', hideLauncherOnLaunchGame)
	}, [hideLauncherOnLaunchGame])

	useEffect(() => {
		setValue('fallingSnowflakes', fallingSnowflakes)
	}, [fallingSnowflakes])

	useEffect(() => {
		setValue('snowflakeCount', snowflakeCount)
	}, [snowflakeCount])

	const value = useMemo(
		() => ({
			theme,
			translation,
			currentTab,
			currentPage,
			background,
			hideLauncherOnLaunchGame,
			fallingSnowflakes,
			snowflakeCount,

			setTheme,
			setTranslation,
			setCurrentTab,
			setCurrentPage,
			setBackground,
			setHideLauncherOnLaunchGame,
			setFallingSnowflakes,
			setSnowflakeCount,
			resetSettings,
		}),
		[
			theme,
			translation,
			currentPage,
			background,
			hideLauncherOnLaunchGame,
			fallingSnowflakes,
			snowflakeCount,
		]
	)

	return (
		<SettingsContext.Provider value={value}>
			{children}
		</SettingsContext.Provider>
	)
}
