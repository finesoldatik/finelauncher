import { FC } from 'react'
import styles from './BoxesAnimation.module.css'

const BoxesAnimation: FC = () => {
	console.log('BoxesAnimation Render')

	return (
		<ul className={styles['box-area']}>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	)
}

export default BoxesAnimation
