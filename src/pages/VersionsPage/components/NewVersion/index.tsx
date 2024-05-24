import styles from './NewVersion.module.scss'
import { useNavigate } from 'react-router-dom'

const NewVersion = () => {
	const navigate = useNavigate()

	console.log('NewVersion Render')

	return (
		<div className={`black-style ${styles['container']}`} onClick={() => navigate('/new-version')}>
			<img
				src='/images/plus-128.png'
				width={96}
				height={96}
				alt='+'
				className={styles['image']}
			/>
			<h2>Новая версия</h2>
		</div>
	)
}

export default NewVersion
