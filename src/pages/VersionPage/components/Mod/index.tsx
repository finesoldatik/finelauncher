import { FC } from 'react'
import styles from './Mod.module.scss'
import { deleteMod } from '../../../../utils/download'

interface IModProps {
	version: string
	modName: string
	mods: string[]
	setMods: (value: string[]) => void
}

const Mod: FC<IModProps> = ({ version, modName, mods, setMods }) => {
	return (
		<div className={`black-style ${styles['container']}`}>
			<h3 className={styles['title']}>{modName}</h3>
			<button
				className='black-style red-bg'
				onClick={async () => {
					deleteMod(version, modName)
					setMods(mods.filter(value => value !== modName))
				}}
			>
				Удалить
			</button>
		</div>
	)
}

export default Mod
