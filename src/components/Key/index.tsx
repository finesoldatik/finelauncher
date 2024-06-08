import { FC } from 'react'
import styles from './Key.module.css'

interface IKeyProps {
	title?: string
}

const Key: FC<IKeyProps> = ({ title }) => {
	return (
		<div className={styles['key-container']}>
			<span>
				<i>{title}</i>
			</span>
		</div>
	)
}

export default Key
