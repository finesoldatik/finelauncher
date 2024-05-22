import { createContext, useState, useContext, ReactNode } from 'react'
import { runGame, terminateProcess } from '../utils/versionManager'

interface ISettingsContextInterface {
	setHideLauncherOnLaunchGame: (value: boolean) => void
	settings: ISettings
	tabId: number
	setTab: (value: number) => void
	gameData: IGameData
	setGamePid: (pid: number | null) => void
	addGameLogs: (logs: string) => void
	removeGameLogs: () => void
	startGame: (version_name: string) => void
	stopGame: () => void
	terminateGame: (pid: number) => void
}

export const SettingsContext = createContext<ISettingsContextInterface>({
	setHideLauncherOnLaunchGame: () => {},
	settings: {
		hideLauncherOnLaunchGame: false,
	},
	tabId: 0,
	setTab: () => {},
	gameData: {
		pid: null,
		logs: [],
	},
	setGamePid: () => {},
	addGameLogs: () => {},
	removeGameLogs: () => {},
	startGame: () => {},
	stopGame: () => {},
	terminateGame: () => {},
})

export const useSettingsContext = () => useContext(SettingsContext)

interface ISettings {
	hideLauncherOnLaunchGame: boolean
}

interface IGameData {
	pid: number | null
	logs: string[]
}

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [tabId, setTabId] = useState<number>(
		Number(localStorage.getItem('tabId')) || 0
	)
	const [gameData, setGameData] = useState<IGameData>({
		pid:
			localStorage.getItem('gamePid') !== ''
				? Number(localStorage.getItem('gamePid'))
				: null,
		logs: [],
	})
	const [settings, setSettings] = useState<ISettings>({
		hideLauncherOnLaunchGame:
			Boolean(localStorage.getItem('hideLauncherOnLaunchGame')) || false,
	})

	const booleanToString = (value: boolean) => {
		if (value) return '1'
		else return ''
	}

	const setHideLauncherOnLaunchGame = (value: boolean) => {
		setSettings(prev => ({ ...prev, hideLauncherOnLaunchGame: value }))
		localStorage.setItem('hideLauncherOnLaunchGame', booleanToString(value))
	}

	const setTab = (value: number) => {
		setTabId(value)
		localStorage.setItem('tabId', String(value))
	}

	const setGamePid = (value: number | null) => {
		setGameData(prev => ({ ...prev, pid: value }))
		localStorage.setItem('gamePid', value !== null ? String(value) : '')
	}

	const addGameLogs = (value: string) => {
		setGameData(prev => ({ ...prev, logs: [...prev.logs, value] }))
	}

	const removeGameLogs = () => {
		setGameData(prev => ({ ...prev, logs: [] }))
	}

	const startGame = (version_name: string) => {
		runGame(version_name)
	}

	const stopGame = () => {
		setGamePid(null)
	}

	const terminateGame = (pid: number) => {
		terminateProcess(pid)
		setGamePid(null)
	}

	return (
		<SettingsContext.Provider
			value={{
				setHideLauncherOnLaunchGame,
				settings,
				tabId,
				setTab,
				gameData,
				setGamePid,
				addGameLogs,
				removeGameLogs,
				startGame,
				stopGame,
				terminateGame,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}
