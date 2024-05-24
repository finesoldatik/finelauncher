import { FC } from 'react'
import styles from './Button.module.scss'
import { IButtonProps } from './Button.interface'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'

const Button: FC<IButtonProps> = ({ onClick, type, image }) => {
	const settingsContext = useSettingsContext()

	return (
		<div
			className={styles[type]}
			onClick={() => {
				onClick()
				settingsContext.terminateGame(Number(settingsContext.gameData.pid))
			}}
		>
			<img width={14} height={14} src={image} alt='btn' />
		</div>
	)
}

export default Button
