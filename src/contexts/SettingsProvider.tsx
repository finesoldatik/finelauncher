import {
	createContext,
	useState,
	useContext,
	ReactNode,
} from 'react'
import { runGame, terminateGame } from '../utils/invokes.ts'

interface SettingsContextInterface {
	gamePid: number | null
	setGamePid: (pid: number | null) => void
	startGame: (version_name: string) => void
	stopGame: () => void
	terminateGameProcess: (pid: number) => void
}

export const SettingsContext = createContext<SettingsContextInterface>({
	gamePid: null,
	setGamePid: () => {},
	startGame: () => {},
	stopGame: () => {},
	terminateGameProcess: () => {},
})

export const useSettingsContext = () => useContext(SettingsContext)

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
	const [gamePid, setGamePid] = useState<number | null>(null)

	const startGame = (version_name: string) => {
		runGame(version_name)
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
				gamePid,
				setGamePid,
				startGame,
				stopGame,
				terminateGameProcess,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}
