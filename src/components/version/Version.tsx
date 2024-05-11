import styles from './Version.module.css'
import { useNavigate } from 'react-router-dom'

interface IVersionProp {
	props: {
		name: string
		version: string
		isVersion: boolean
	}
}

export default function Version(props: IVersionProp) {
	const navigate = useNavigate()

	const properties = props.props

	let image

	if (properties.version.split(' ')[0] === 'VE') image = '/images/ve-512.png'
	else if (properties.version.split(' ')[0] === 'RVE')
		image = '/images/rve-512.png'

	return (
		<button
			style={{ borderRadius: 0, margin: 1 }}
			className='default box'
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
				className={styles.image}
			/>
			<h2
				className={styles.title}
				style={{ margin: 'auto', textAlign: 'center' }}
			>
				{properties.name}
			</h2>
			<p
				className={styles.version}
				style={{ margin: 'auto', textAlign: 'center' }}
			>
				{properties.version}
			</p>
		</button>
	)
}
