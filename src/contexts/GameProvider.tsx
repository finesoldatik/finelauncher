'use client'
import { createContext, useState, useContext, ReactNode, useMemo } from 'react'
import { getValue, setValue } from '../utils/localStorage'
import { runGame, terminateProcess } from '../utils/instanceManager'

interface IGameContext {
	setOption: (value: boolean, key: string) => void
	gameData: IGameData
	setGamePId: (pid: number | null) => void
	addGameLogs: (logs: string) => void
	deleteGameLogs: () => void
	startGame: (version_name: string) => void
	stopGame: () => void
	terminateGame: (pid: number) => void
}

export const GameContext = createContext<IGameContext>({
	setOption: () => {},
	gameData: {
		gamePId: null,
		gameLogs: [],
	},
	setGamePId: () => {},
	addGameLogs: () => {},
	deleteGameLogs: () => {},
	startGame: () => {},
	stopGame: () => {},
	terminateGame: () => {},
})

export const useGameContext = () => useContext(GameContext)

interface IGameData {
	gamePId: number | null
	gameLogs: string[]
}

export const GameProvider = ({ children }: { children: ReactNode }) => {
	const [gameData, setGameData] = useState<IGameData>({
		gamePId: getValue('gamePId') || null,
		gameLogs: getValue('gameLogs') || [],
	})
	const [logs, setLogs] = useState<string[]>([])

	const setOption = (value: any, key: string) => {
		setGameData(prev => ({ ...prev, [key]: value }))
		setValue(value, key)
	}

	const setGamePId = (value: number | null) => {
		setOption(value, 'gamePId')
	}

	const addGameLogs = (value: string) => {
		console.log(logs)
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
		setOption(null, 'gamePId')
	}

	const terminateGame = (PID: number) => {
		terminateProcess(PID)
		setOption(null, 'gamePId')
	}

	const value = useMemo(
		() => ({
			setOption,
			gameData,
			setGamePId,
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
