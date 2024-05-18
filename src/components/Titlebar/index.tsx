import styles from './Titlebar.module.scss'
import Button from './components/Button'
import { btns } from './data'

const Titlebar = () => {
	return (
		<>
			<div data-tauri-drag-region className={styles['container']}>
				<div data-tauri-drag-region>finelauncher</div>
				<div className={styles['btn-container']}>
					{btns.map((btn, idx) => (
						<Button
							onClick={btn.onClick}
							btnClose={btn.btnClose}
							svgPath={btn.svgPath}
							key={idx}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default Titlebar
