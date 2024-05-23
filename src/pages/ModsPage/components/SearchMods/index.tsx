import { FC, useRef } from 'react'
import styles from './SearchMods.module.scss'
import { getModsBySearchQuery } from '../../../../utils/mod/index.ts'
import { IMods } from '../../ModsPage.interface'
import ModWrapper from '../../../../utils/mod/Wrapper'

interface SearchModsProps {
	modWrapper: ModWrapper
	setMods: (value: IMods) => void
}

const SearchMods: FC<SearchModsProps> = ({ modWrapper, setMods }) => {
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
					if (ref.current)
						getModsBySearchQuery(modWrapper, setMods, ref.current.value)
				}}
			>
				Искать
			</button>
		</div>
	)
}

export default SearchMods
