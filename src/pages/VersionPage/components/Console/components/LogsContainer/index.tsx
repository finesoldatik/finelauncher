import { FC } from 'react'
import styles from './LogsContainer.module.scss'
import { ILogsContainerProps } from './LogsContainer.interface'

const LogsContainer: FC<ILogsContainerProps> = ({ logs }) => {
	console.log('LogsContainer Render')

	return (
		<>
			{logs ? (
				<div className={styles['text']}>
					{logs.map(value => (
						<p className='violet-text'>{value}</p>
					))}
				</div>
			) : (
				<h1 className={styles['text']}>Логи не найдены.</h1>
			)}
		</>
	)
}

export default LogsContainer
