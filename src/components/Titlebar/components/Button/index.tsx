import { FC } from 'react'
import styles from './Button.module.scss'
import { IButtonProps } from './Button.interface'

const Button: FC<IButtonProps> = ({ onClick, type, image }) => {
	console.log('Titlebar Button Render')

	return (
		<div className={styles[type]} onClick={onClick}>
			<img width={14} height={14} src={image} alt='btn' />
		</div>
	)
}

export default Button
