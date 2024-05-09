import styles from './NewVersion.module.css'
import { useNavigate } from 'react-router-dom'

export default function NewVersion() {
	const navigate = useNavigate()
	return (
		<button className='default box' onClick={() => navigate('/new-version')}>
			<img
				src='/images/plus-128.png'
				width={96}
				height={96}
				alt='+'
				className={styles.image}
			/>
			<h2 className={styles.title}>Новая версия</h2>
		</button>
	)
}
