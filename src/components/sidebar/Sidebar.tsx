import { useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.css'

const topItems = [
	{
		image: '/images/gamepad-64.png',
		link: '/',
	},
	{
		image: '/images/box-128-2.png',
		link: '/versions',
	},
	{
		image: '/images/mod.png',
		link: '/mods',
	},
]
const bottomItems = [
	{
		image: '/images/settings-96.png',
		link: '/settings',
	},
]

export default function Home() {
	const navigate = useNavigate()
	return (
		<>
			<div className={styles.sidebar}>
				<div className={styles.top_items}>
					{topItems.map((el, idx) => (
						<div
							key={idx}
							className={styles.item}
							onClick={() => navigate(el.link)}
						>
							<img src={el.image} alt='image' width='30px' />
						</div>
					))}
				</div>
				<div className={styles.bottom_items}>
					{bottomItems.map((el, idx) => (
						<div
							key={idx}
							className={styles.item}
							onClick={() => navigate(el.link)}
						>
							<img src={el.image} alt='image' width='30px' />
						</div>
					))}
				</div>
			</div>
		</>
	)
}
