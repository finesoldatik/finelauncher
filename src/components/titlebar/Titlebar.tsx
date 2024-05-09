import { appWindow } from '@tauri-apps/api/window'
import styles from './Titlebar.module.css'

export default function Titlebar() {
	const minimize = () => appWindow.minimize()
	const toggleMaximize = () => appWindow.toggleMaximize()
	const close = () => appWindow.close()
	return (
		<>
			<div data-tauri-drag-region className={styles.titlebar}>
				<div data-tauri-drag-region>finelauncher</div>
				<div className={styles.titlebarBox}>
					<div className={styles.btn} onClick={minimize}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='1em'
							height='1em'
							viewBox='0 0 24 24'
						>
							<path fill='currentColor' d='M20 14H4v-4h16' />
						</svg>
					</div>
					<div className={styles.btn} onClick={toggleMaximize}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='1em'
							height='1em'
							viewBox='0 0 24 24'
						>
							<path fill='currentColor' d='M4 4h16v16H4zm2 4v10h12V8z' />
						</svg>
					</div>
					<div className={styles.btnClose} onClick={close}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='1em'
							height='1em'
							viewBox='0 0 24 24'
						>
							<path
								fill='currentColor'
								d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z'
							/>
						</svg>
					</div>
				</div>
			</div>
		</>
	)
}
