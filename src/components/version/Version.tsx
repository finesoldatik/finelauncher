import styles from './Version.module.scss'
import { useNavigate } from 'react-router-dom'
import { IProps } from './interface.ts'

export default function Version(props: IProps) {
	const navigate = useNavigate()

	const version = props.version

	let image

	if (version.version.split(' ')[0] === 'VE') image = '/images/ve-512.png'
	else if (version.version.split(' ')[0] === 'RVE')
		image = '/images/rve-512.png'

	return (
		<button
			className={'black-style ' + styles['container']}
			onClick={() =>
				version.isVersion
					? navigate(`/versions/${version.name}/${version.version}`)
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
			<h2 className={styles['text']}>{version.name}</h2>
			<p className={styles['text']}>{version.version}</p>
		</button>
	)
}
