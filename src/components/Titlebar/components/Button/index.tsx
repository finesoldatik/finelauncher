import { FC } from 'react'
import styles from './Button.module.scss'
import { ButtonProps } from './Button.interface'

const Button: FC<ButtonProps> = ({ onClick, btnClose, svgPath }) => {
	return (
		<div
			className={
				btnClose ? styles['btn-close'] : styles['btn']
			}
			onClick={onClick}
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
