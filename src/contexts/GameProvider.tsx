import { createContext, useState, useContext, ReactNode, useMemo } from 'react'
import { setValue } from '../utils/localStorage'
import { runGame, terminateProcess } from '../utils/instanceManager'

interface IGameContext {
	pid: number | null
	logs: string[]
	setGamePid: (pid: number | null) => void
	addGameLogs: (logs: string) => void
	deleteGameLogs: () => void
	startGame: (version_name: string) => void
	stopGame: () => void
	terminateGame: (pid: number) => void
}

export const GameContext = createContext<IGameContext>({
	pid: null,
	logs: [],
	setGamePid: () => {},
	addGameLogs: () => {},
	deleteGameLogs: () => {},
	startGame: () => {},
	stopGame: () => {},
	terminateGame: () => {},
})

export const useGameContext = () => useContext(GameContext)

export default function GameProvider({ children }: { children: ReactNode }) {
	console.log('GameProvider Render')

	const [pid, setPid] = useState<number | null>(null)
	const [logs, setLogs] = useState<string[]>([])

	const setGamePid = (value: number | null) => {
		setValue(value, 'gamePid')
		setPid(value)
	}

	const addGameLogs = (value: string) => {
		setLogs(prev => {
			setValue([...prev, value], 'gameLogs')
			return [...prev, value]
		})
	}

	const deleteGameLogs = () => {
		setValue([], 'gameLogs')
	}

	const startGame = (version_name: string) => {
		runGame(version_name)
	}

	const stopGame = () => {
		setValue(null, 'gamePid')
	}

	const terminateGame = (PID: number) => {
		terminateProcess(PID)
		setGamePid(null)
	}

	const value = useMemo(
		() => ({
			pid,
			logs,
			setGamePid,
			addGameLogs,
			deleteGameLogs,
			startGame,
			stopGame,
			terminateGame,
		}),
		[pid, logs]
	)

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
