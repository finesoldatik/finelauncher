import { FC } from 'react'
import styles from './GreatContribution.module.scss'
import { greatPeople } from './data'

const GreatContribution: FC = () => {
	return (
		<div className={'black-style ' + styles['container']}>
			<p>Большой вклад внесли:</p>
			{greatPeople.map((user, idx) => (
				<p className='violet-text' key={idx}>
					@{user}
				</p>
			))}
		</div>
	)
}

export default GreatContribution
