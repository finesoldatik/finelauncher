import { useState } from 'react'
import styles from './Sidebar.module.scss'
import Item from './components/Item/Item'

const topItems = [
	{
		id: 0,
		image: '/images/home-96.png',
		link: '/',
	},
	{
		id: 1,
		image: '/images/gamepad-64.png',
		link: '/versions',
	},
	{
		id: 2,
		image: '/images/box-128-2.png',
		link: '/mods',
	},
]

const bottomItems = [
	{
		id: 3,
		image: '/images/settings-96.png',
		link: '/settings',
	},
]

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
