import { FC, useEffect, useState } from 'react'
import styles from './LogsContainer.module.scss'
import { useGameContext } from '../../../../../../contexts/GameProvider'

const LogsContainer: FC = () => {
	console.log('LogsContainer Render')

	const gameContext = useGameContext()

	const [logs, setLogs] = useState<string[]>(gameContext.gameData.gameLogs)

	useEffect(() => {
		setLogs(gameContext.gameData.gameLogs)
	}, [gameContext.gameData.gameLogs])

	return (
		<div className={styles['container']}>
			{logs.map((value, idx) => (
				<p className='violet-text' key={idx}>
					{value}
				</p>
			))}
		</div>
	)
}

export default LogsContainer
