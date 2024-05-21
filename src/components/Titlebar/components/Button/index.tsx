import { FC } from 'react'
import styles from './Button.module.scss'
import { IButtonProps } from './Button.interface'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'

const Button: FC<IButtonProps> = ({ onClick, type, svgPath }) => {
	const settingsContext = useSettingsContext()

	return (
		<div
			className={styles[type]}
			onClick={() => {
				onClick()
				settingsContext.terminateGameProcess(
					Number(settingsContext.gameData.pid)
				)
			}}
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='1em'
				height='1em'
				viewBox='0 0 24 24'
			>
				<path fill='currentColor' d={svgPath} />
			</svg>
		</div>
	)
}

export default Button
