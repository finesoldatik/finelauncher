import { FC, useRef } from 'react'
import styles from './SearchMods.module.scss'

interface SearchModsProps {
	setValue: (value: string) => void
}

const SearchMods: FC<SearchModsProps> = ({ setValue }) => {
	const ref = useRef<HTMLInputElement>(null)
	return (
		<div className={styles['container']}>
			<input
				className={`black-style ${styles['input']}`}
				ref={ref}
				type='text'
				placeholder='Введите отрывок/название мода'
			/>
			<button
				className={`black-style ${styles['btn']}`}
				onClick={() => {
					if (ref.current) setValue(ref.current.value)
				}}
			>
				Искать
			</button>
		</div>
	)
}

export default SearchMods
