import { useParams } from 'react-router-dom'
import api from '../../api.ts'
import styles from './VersionPage.module.scss'
import { FC } from 'react'

const VersionPage: FC = () => {
	const params = useParams()
	const version: string = String(params.version)
	const name: string = String(params.name)

	console.log(params)

	let image

	if (version.split(' ')[0] === 'VE') image = '/images/ve-512.png'
	else if (version.split(' ')[0] === 'RVE') image = '/images/rve-512.png'

	return (
		<div className={'black-style ' + styles['container']}>
			<img
				className={styles['img']}
				src={image}
				width={160}
				height={160}
				alt='image'
			/>
			<h3>Имя версии: {params.name}</h3>
			<div className={styles['btn-container']}>
				<button
					className={'black-style ' + styles['opendir-btn']}
					onClick={() => api.ShowInFolder(name)}
				>
					Открыть в проводнике
				</button>
				<button
					className={'black-style green-bg ' + styles['play-btn']}
					onClick={() => api.runGame(name)}
				>
					Играть
				</button>
			</div>
		</div>
	)
}

export default VersionPage
