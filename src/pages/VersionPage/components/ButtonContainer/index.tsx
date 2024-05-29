import { FC, memo } from 'react'
import styles from './ButtonContainer.module.scss'
import { openInFileManager } from '../../../../utils/versionManager'
import { useNavigate } from 'react-router-dom'
import { deleteInstance } from '../../../../utils/download'

interface IButtonContainer {
	name: string
}

const ButtonContainer: FC<IButtonContainer> = memo(({ name }) => {
	console.log('ButtonContainer Render')
	const navigate = useNavigate()

	return (
		<div className={styles['container']}>
			<button className={`black-style ${styles['settings-btn']}`}>
				Настройки
			</button>
			<div className={styles['btns']}>
				<button
					className={`black-style ${styles['opendir-btn']}`}
					onClick={() => openInFileManager(name)}
				>
					Открыть в проводнике
				</button>
				<button
					className={`black-style red-bg ${styles['delete-btn']}`}
					onClick={() =>
						deleteInstance(name).then(() => {
							navigate('/versions')
						})
					}
				>
					Удалить
				</button>
			</div>
		</div>
	)
})

export default ButtonContainer
