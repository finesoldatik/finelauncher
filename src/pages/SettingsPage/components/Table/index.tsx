import { FC } from 'react'
import styles from './Table.module.scss'

interface ITableProps {
	title: string
	items: string[]
}

const Table: FC<ITableProps> = ({ title, items }) => {
	return (
		<div className={`black-style no-boundary-radius ${styles['container']}`}>
			<p>{title}</p>
			{items.map((item, idx) => (
				<p className='violet-text' key={idx}>
					{item}
				</p>
			))}
		</div>
	)
}

export default Table
