import { FC, useRef, useEffect } from 'react'
import styles from './Option.module.scss'

interface IOptionProps {
	label: string
	value: boolean
	setOption: (value: boolean, key: string) => void
}

type OnChange = () => void

const Option: FC<IOptionProps> = ({ label, value, setOption }) => {
	const ref = useRef<HTMLInputElement>(null)

	console.log('Option Render')

	useEffect(() => {
		if (ref.current) {
			ref.current.checked = value
		}
	}, [ref, value])

	const onChange: OnChange = () => {
		if (ref.current) {
			setOption(ref.current.checked, 'hideLauncherOnLaunchGame')
		}
	}

	return (
		<div className={styles['container']}>
			<label>{label}</label>
			<input
				className={styles['checkbox']}
				ref={ref}
				onChange={onChange}
				type='checkbox'
				placeholder='Скрывать лаунчер при запуске игры'
			/>
		</div>
	)
}

export default Option
