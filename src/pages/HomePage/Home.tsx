import { useNavigate } from 'react-router-dom'
import styles from './Home.module.scss'
import { FC } from 'react'

const Home: FC = () => {
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
					onClick={() => navigate('/mods')}
				>
					Моды
				</button>
			</div>
		</div>
	)
}

export default Home
