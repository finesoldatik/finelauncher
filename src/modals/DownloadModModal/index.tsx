import { useState } from 'react'
import styles from './DownloadModModal.module.css'
import { IMod } from '../ModModal/ModModal.types'

interface IDownloadModModalProps {
	active: boolean
	setActive: (value: boolean) => void
	mod: IMod
	modDownloadUrl: string
}

export default function DownloadModModal({
	active,
	setActive,
	mod,
	modDownloadUrl,
}: IDownloadModModalProps) {
	const [instance, setInstance] = useState<string>()

	return (
		<div
			className={
				active ? `${styles['modal']} ${styles['active']}` : styles['modal']
			}
			onClick={() => setActive(false)}
		>
			<div className={styles['content']} onClick={e => e.stopPropagation()}>
				<h1>
					ChangeVersionModal {modDownloadUrl} {mod.content.title}
				</h1>
			</div>
		</div>
	)
}
