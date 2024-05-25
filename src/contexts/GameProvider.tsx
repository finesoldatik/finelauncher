import { createContext, useState, useContext, ReactNode, useMemo } from 'react'
import { getValue, setValue } from '../utils/localStorage'
import { runGame, terminateProcess } from '../utils/versionManager'

interface IGameContext {
	setOption: (value: boolean, key: string) => void
	gameData: IGameData
	setGamePID: (pid: number | null) => void
	addGameLogs: (logs: string) => void
	deleteGameLogs: () => void
	startGame: (version_name: string) => void
	stopGame: () => void
	terminateGame: (pid: number) => void
}

export const GameContext = createContext<IGameContext>({
	setOption: () => {},
	gameData: {
		gamePID: null,
		gameLogs: [],
	},
	setGamePID: () => {},
	addGameLogs: () => {},
	deleteGameLogs: () => {},
	startGame: () => {},
	stopGame: () => {},
	terminateGame: () => {},
})

export const useGameContext = () => useContext(GameContext)

interface IGameData {
	gamePID: number | null
	gameLogs: string[]
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
	const [gameData, setGameData] = useState<IGameData>({
		gamePID: getValue('gamePID') || null,
		gameLogs: getValue('gameLogs') || [],
	})
	const [logs, setLogs] = useState<string[]>([])

	const setOption = (value: any, key: string) => {
		setGameData(prev => ({ ...prev, [key]: value }))
		setValue(value, key)
	}

	const setGamePID = (value: number | null) => {
		setOption(value, 'gamePID')
	}

	const addGameLogs = (value: string) => {
		setLogs(prev => {
			setOption([...prev, value], 'gameLogs')
			return [...prev, value]
		})
	}

	const deleteGameLogs = () => {
		setOption([], 'gameLogs')
	}

	const startGame = (version_name: string) => {
		runGame(version_name)
	}

	const stopGame = () => {
		setOption(null, 'gamePID')
	}

	const terminateGame = (PID: number) => {
		terminateProcess(PID)
		setOption(null, 'gamePID')
	}

	const value = useMemo(
		() => ({
			setOption,
			gameData,
			setGamePID,
			addGameLogs,
			deleteGameLogs,
			startGame,
			stopGame,
			terminateGame,
		}),
		[gameData]
	)

	return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}
