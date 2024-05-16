import { useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.scss'

const topItems = [
	{
		image: '/images/home-96.png',
		link: '/',
	},
	{
		image: '/images/gamepad-64.png',
		link: '/versions',
	},
	{
		image: '/images/box-128-2.png',
		link: '/mods',
	},
]

const bottomItems = [
	{
		image: '/images/settings-96.png',
		link: '/settings',
	},
]

const Sidebar = () => {
	const navigate = useNavigate()
	return (
		<>
			<div className={styles['container']}>
				<div className={styles['top-items']}>
					{topItems.map((el, idx) => (
						<div
							key={idx}
							className={styles['item']}
							onClick={() => navigate(el.link)}
						>
							<img src={el.image} alt='image' width='30px' />
						</div>
					))}
				</div>
				<div className={styles['bottom-items']}>
					{bottomItems.map((el, idx) => (
						<div
							key={idx}
							className={styles['item']}
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

export default Sidebar
