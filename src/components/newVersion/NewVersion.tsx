import styles from './NewVersion.module.scss'
import { useNavigate } from 'react-router-dom'

export default function NewVersion() {
	const navigate = useNavigate()
	return (
		<button className='black-style' onClick={() => navigate('/new-version')}>
			<img
				src='/images/plus-128.png'
				width={96}
				height={96}
				alt='+'
				className={styles['image']}
			/>
			<h2>Новая версия</h2>
		</button>
	)
}
