import { FC } from 'react'
import styles from './LoadingModal.module.scss'

const LoadingModal: FC = () => {
	return (
		<div className={styles['modal']}>
			<h3 className={styles['content']}>Идет загрузка</h3>
		</div>
	)
}

export default LoadingModal
