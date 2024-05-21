import { createContext, useState, useContext, ReactNode } from 'react'
import { runGame, terminateGame } from '../utils/invokes.ts'

interface SettingsContextInterface {
	tabId: number
	setTab: (value: number) => void
	gamePid: number | null
	setGamePid: (pid: number | null) => void
	hideLauncherOnLaunchGame: boolean
	setHideLauncherOnLaunch: (value: boolean) => void
	startGame: (version_name: string) => void
	stopGame: () => void
	terminateGameProcess: (pid: number) => void
}

export const SettingsContext = createContext<SettingsContextInterface>({
	tabId: 0,
	setTab: () => {},
	gamePid: null,
	setGamePid: () => {},
	hideLauncherOnLaunchGame: false,
	setHideLauncherOnLaunch: () => {},
	startGame: () => {},
	stopGame: () => {},
	terminateGameProcess: () => {},
})

export const useSettingsContext = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [tabId, setTabId] = useState<number>(0)
	const [gamePid, setGamePid] = useState<number | null>(null)
	const [hideLauncherOnLaunchGame, setHideLauncherOnLaunchGame] =
		useState<boolean>(
			Boolean(localStorage.getItem('hideLauncherOnLaunchGame')) || false
		)

	const booleanToString = (value: boolean) => {
		if (value) return '1'
		else return ''
	}

	const startGame = (version_name: string) => {
		runGame(version_name)
	}

	const setHideLauncherOnLaunch = (value: boolean) => {
		setHideLauncherOnLaunchGame(value)
		localStorage.setItem('hideLauncherOnLaunchGame', booleanToString(value))
	}

	const setTab = (value: number) => {
		setTabId(value)
		localStorage.setItem('tabId', String(value))
	}

	const stopGame = () => {
		setGamePid(null)
	}

	const terminateGameProcess = (pid: number) => {
		terminateGame(pid)
		setGamePid(null)
	}

	return (
		<SettingsContext.Provider
			value={{
				tabId,
				setTab,
				gamePid,
				setGamePid,
				hideLauncherOnLaunchGame,
				setHideLauncherOnLaunch,
				startGame,
				stopGame,
				terminateGameProcess,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}
