import { FC } from 'react'
import styles from './SettingsPage.module.scss'
import tables from './data'
import Table from './components/Table'
import Settings from './components/Settings'

const SettingsPage: FC = () => {
	console.log('SettingsPage Render')

	return (
		<div className={styles['container']}>
			<Settings />

			<div className={styles['about-container']}>
				{tables.map((table, idx) => (
					<Table title={table.title} items={table.items} key={idx} />
				))}
			</div>
		</div>
	)
}

export default SettingsPage
