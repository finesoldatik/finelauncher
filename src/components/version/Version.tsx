import styles from './Version.module.scss'
import { useNavigate } from 'react-router-dom'
import { IProps } from './interface.ts'

export default function Version(props: IProps) {
	const navigate = useNavigate()

	const properties = props.props

	let image

	if (properties.version.split(' ')[0] === 'VE') image = '/images/ve-512.png'
	else if (properties.version.split(' ')[0] === 'RVE')
		image = '/images/rve-512.png'

	return (
		<button
			className={'black-style ' + styles['container']}
			onClick={() =>
				properties.isVersion
					? navigate(`/versions/${properties.name}/${properties.version}`)
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
			<h2 className={styles['text']}>{properties.name}</h2>
			<p className={styles['text']}>{properties.version}</p>
		</button>
	)
}
