import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'

export default function Home() {
	const navigate = useNavigate()
	return (
		<div className={styles['container']}>
			<h1>
				<p className={'violet-text ' + styles['inline']}>Привет!</p>{' '}
				<p className={styles['inline']}>Давай</p>
			</h1>
			<h1>
				<p className={styles['inline']}>скорей начнем</p>{' '}
				<p className={'violet-text ' + styles['inline']}>играть!</p>
			</h1>
			<div className={styles['btn-container']}>
				<button
					className={'black-style violet-bg ' + styles['versions-btn']}
					onClick={() => navigate('/versions')}
				>
					Версии
				</button>
				<button
					className={'black-style green-bg ' + styles['play-btn']}
					onClick={() => navigate('/versions')}
				>
					Играть
				</button>
			</div>
		</div>
	)
}
