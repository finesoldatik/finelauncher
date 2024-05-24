import styles from './Version.module.scss'
import { useNavigate } from 'react-router-dom'
import { IVersionProps } from './Version.interface'
import { FC } from 'react'

const Version: FC<IVersionProps> = ({ version, name, isVersion }) => {
	const navigate = useNavigate()

	console.log('Version Render')

	let image

	if (version.split(' ')[0] === 'VE') image = '/images/version/ve-512.png'
	else if (version.split(' ')[0] === 'RVE')
		image = '/images/version/rve-512.png'

	return (
		<div
			className={`black-style no-boundary-radius ${styles['container']}`}
			onClick={() =>
				isVersion
					? navigate(`/versions/${name}/${version}`)
					: console.log('Пустая версия')
			}
		>
			<img
				src={image}
				width={96}
				height={96}
				alt='image'
				className={styles['image']}
			/>
			<h2 className={styles['text']}>{name}</h2>
			<p className={styles['text']}>{version}</p>
		</div>
	)
}

export default Version
