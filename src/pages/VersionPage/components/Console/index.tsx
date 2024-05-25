import { FC, memo } from 'react'
import styles from './Console.module.scss'
import StopButton from './components/StopButton'
import LogsContainer from './components/LogsContainer'

const Console: FC = memo(() => {
	console.log('Console Render')

	return (
		<>
			<div>
				<h1 className={styles['title']}>Логи игры</h1>
				<div className={styles['container']}>
					<LogsContainer />
					<StopButton />
				</div>
			</div>
		</>
	)
})

export default Console
