import styles from './Titlebar.module.scss'
import Button from './components/Button'
import { btns } from './data'

const Titlebar = () => {
	console.log('Titlebar Render')

	return (
		<>
			<div data-tauri-drag-region className={styles['container']}>
				<div data-tauri-drag-region className={styles['title-container']}>
					<p>finelauncher</p>
				</div>
				<div className={styles['btn-container']}>
					{btns.map((btn, idx) => (
						<Button
							onClick={btn.onClick}
							type={btn.type}
							image={btn.image}
							key={idx}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default Titlebar
