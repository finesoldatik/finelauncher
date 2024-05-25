import { FC } from 'react'
import styles from './StopButton.module.scss'
import { useGameContext } from '../../../../../../contexts/GameProvider'

const StopButton: FC = () => {
	const gameContext = useGameContext()

	console.log('StopButton Render')

	return (
		<button
			className={`black-style red-bg no-boundary-radius ${styles['btn']}`}
			onClick={() => {
				gameContext.terminateGame(Number(gameContext.gameData.gamePID))
			}}
		>
			Остановить игру
		</button>
	)
}

export default StopButton
