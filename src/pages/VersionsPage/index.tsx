import { FC } from 'react'
import NewVersion from './components/NewVersion/index.tsx'
import Versions from './components/Versions/index.tsx'
import styles from './VersionsPage.module.scss'

const VersionsPage: FC = () => {
	console.log('VersionsPage Render')

	return (
		<div className={styles['container']}>
			<NewVersion />
			<Versions />
		</div>
	)
}

export default VersionsPage
