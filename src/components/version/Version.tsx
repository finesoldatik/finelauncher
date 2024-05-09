import styles from './Version.module.css'
import { useNavigate } from 'react-router-dom'

export default function Version(title: string, version: string, idx: number) {
	const navigate = useNavigate()
	return (
		<button
			style={{ borderRadius: 0, margin: 1 }}
			className='default box'
			onClick={() => navigate('/version')}
			key={idx}
		>
			<img
				src='/images/ve-512.png'
				width={96}
				height={96}
				alt='Voxel Engine'
				className={styles.image}
			/>
			<h2 className={styles.title}>{title}</h2>
			<p className={styles.version}>{version}</p>
		</button>
	)
}
