import styles from './Mod.module.scss'
import { IMod, IProps, setMods } from './interface'
import ModWrapper from '../../utils/mod'
import { useNavigate } from 'react-router-dom'

const getModsByTag = (
	modWrapper: ModWrapper,
	setMods: setMods,
	tag_id: number[]
) => {
	modWrapper.getMods({ params: { tag_id } }).then(response => {
		console.log(response.data.data)
		setMods(response.data.data)
	})
}

export default function Mod(props: IProps) {
	const navigate = useNavigate()
	const mod: IMod = props.mod
	const modWrapper = new ModWrapper()
	return (
		<div
			className={'black-style ' + styles['container']}
			onClick={() => navigate(`/mods/${mod.id}`)}
		>
			<img
				width={128}
				height={128}
				src={'https://voxelworld.ru' + mod.pathLogo}
				alt='Лого мода'
			/>
			<div className={styles['title-container']}>
				<h2 className={styles['title']}>{mod.title}</h2>
				<h4 className={'violet-text ' + styles['author']}>
					Автор: {mod.author.name}
				</h4>
			</div>
			<p className={styles['description']}>{mod.description}</p>
			<div className={styles['tags']}>
				{mod.tags.map(tag => (
					<button
						className={'black-style ' + styles['tag']}
						onClick={() => getModsByTag(modWrapper, props.setMods, [tag.id])}
						key={tag.id}
					>
						{tag.title}
					</button>
				))}
			</div>
		</div>
	)
}
