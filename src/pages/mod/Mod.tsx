import { useEffect, useState } from 'react'
import ModWrapper from '../../utils/mod'
import { useParams } from 'react-router-dom'
import { IMod } from './interface'
import styles from './Mod.module.scss'

export default function Mod() {
	const [mod, setMod] = useState<IMod>(Object)

	const params = useParams()
	const id: number = Number(params.id)

	const modWrapper = new ModWrapper()

	useEffect(() => {
		modWrapper.getMod(id).then(value => {
			console.log(value.data.data)
			setMod(value.data.data)
		})
	}, [])

	return (
		<div>
			{mod.content ? (
				<div className={'black-style ' + styles['container']}>
					<img
						width={256}
						height={256}
						src={'https://voxelworld.ru' + mod.content.pathLogo}
						alt='Лого мода'
					/>
					<div className={styles['title-container']}>
						<h2 className={styles['title']}>{mod.content.title}</h2>
						<h4 className={'violet-text ' + styles['author']}>
							Автор: {mod.content.author.name}
						</h4>
					</div>
					<p className={styles['description']}>{mod.content.description}</p>
					<div className={styles['tags']}>
						{mod.content.tags.map(tag => (
							<button className={'black-style ' + styles['tag']} key={tag.id}>
								{tag.title}
							</button>
						))}
					</div>
				</div>
			) : (
				<p>Загрузка мода.</p>
			)}
		</div>
	)
}
