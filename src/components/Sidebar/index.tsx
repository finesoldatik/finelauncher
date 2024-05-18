import { useState } from 'react'
import styles from './Sidebar.module.scss'
import Item from './components/Item'
import { topItems, bottomItems } from './data.ts'

const Sidebar = () => {
	const [activeTab, setActiveTab] = useState(0)
	return (
		<>
			<div className={styles['container']}>
				<div className={styles['top-items']}>
					{topItems.map(el => (
						<Item
							element={{
								...el,
								active: activeTab,
								setActive: setActiveTab,
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
								active: activeTab,
								setActive: setActiveTab,
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
