import { FC, memo } from 'react'
import styles from './ButtonContainer.module.scss'
import { openInFileManager } from '../../../../utils/versionManager'
import PlayButton from './components/PlayButton'

interface IButtonContainer {
	name: string
}

const ButtonContainer: FC<IButtonContainer> = memo(({ name }) => {
	console.log('ButtonContainer Render')

	return (
		<div className={styles['container']}>
			<button
				className={`black-style ${styles['opendir-btn']}`}
				onClick={() => openInFileManager(name)}
			>
				Открыть в проводнике
			</button>
			<PlayButton name={name} />
		</div>
	)
})

export default ButtonContainer
