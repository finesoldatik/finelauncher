import styles from './Mod.module.scss'
import { IMod, IProps } from './interface'
import ModWrapper from '../../utils/mod'
import { useNavigate } from 'react-router-dom'
import api from '../../api'

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
			<h2 className={styles['title']}>{mod.title}</h2>
			<div className={styles['author-container']}>
				<h4 className='violet-text'>
					Автор: {mod.author.name}
				</h4>
				<h4 className='violet-text'>Скачиваний: {mod.downloads}</h4>
			</div>

			<p className={styles['description']}>{mod.description}</p>
			<div className={styles['tags']}>
				{mod.tags.map(tag => (
					<button
						className={'black-style ' + styles['tag']}
						onClick={() =>
							api.getModsByTag(modWrapper, props.setMods, [tag.id])
						}
						key={tag.id}
					>
						{tag.title}
					</button>
				))}
			</div>
		</div>
	)
}
