import styles from './Mod.module.scss'
import { ModProps } from './Mod.interface'
import ModWrapper from '../../../../utils/mod'
import { useNavigate } from 'react-router-dom'
import { getModsByTag } from '../../../../utils/invokes.ts'
import { FC } from 'react'

const Mod: FC<ModProps> = ({ mod, setMods }) => {
	const navigate = useNavigate()
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
				<h4 className='violet-text'>Автор: {mod.author.name}</h4>
				<h4 className='violet-text'>Скачиваний: {mod.downloads}</h4>
			</div>

			<p className={styles['description']}>{mod.description}</p>
			<div className={styles['tags']}>
				{mod.tags.map(tag => (
					<button
						className={'black-style ' + styles['tag']}
						onClick={() => getModsByTag(modWrapper, setMods, [tag.id])}
						key={tag.id}
					>
						{tag.title}
					</button>
				))}
			</div>
		</div>
	)
}

export default Mod
