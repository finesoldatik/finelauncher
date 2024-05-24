import { FC, memo } from 'react'
import styles from './Console.module.scss'
import { IConsoleProps } from './Console.interface'
import StopButton from './components/StopButton'
import LogsContainer from './components/LogsContainer'

const Console: FC<IConsoleProps> = memo(({ logs }) => {
	console.log('Console Render')

	return (
		<>
			<div>
				<h1 className={styles['title']}>Логи игры</h1>
				<div className={styles['container']}>
					<LogsContainer logs={logs} />
					<StopButton />
				</div>
			</div>
		</>
	)
})

export default Console
