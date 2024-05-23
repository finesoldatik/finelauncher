import styles from './Sidebar.module.scss'
import Item from './components/Item'
import { topItems, bottomItems } from './data.ts'
import { useSettingsContext } from '../../contexts/SettingsProvider.tsx'

const Sidebar = () => {
	const settingsContext = useSettingsContext()
	return (
		<>
			<div className={styles['container']}>
				<div className={styles['top-items']}>
					{topItems.map(el => (
						<Item
							element={{
								...el,
								active: settingsContext.tabId,
								setActive: settingsContext.setTab,
							}}
							key={el.id}
						/>
					))}
				</div>

				<div className={styles['bottom-items']}>
					{bottomItems.map(el => (
						<Item
							element={{
								...el,
								active: settingsContext.tabId,
								setActive: settingsContext.setTab,
							}}
							key={el.id}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default Sidebar
