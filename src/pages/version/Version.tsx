import { useParams } from 'react-router-dom'
import api from '../../api.ts'
import styles from './Version.module.scss'
import { IParams } from './interface.ts'

export default function Version() {
	const params: IParams = useParams()

	let image

	if (params.version?.split(' ')[0] === 'VE') image = '/images/ve-512.png'
	else if (params.version?.split(' ')[0] === 'RVE') image = '/images/rve-512.png'

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
					onClick={() => api.openDirOfVersion(params.name)}
				>
					Открыть в проводнике
				</button>
				<button
					className={'black-style green-bg ' + styles['play-btn']}
					onClick={() => api.runVersion(params.name)}
				>
					Играть
				</button>
			</div>
		</div>
	)
}
