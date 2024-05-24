import { FC } from 'react'
import styles from './NewVersionPage.module.scss'
import NewVersionForm from './components/NewVersionForm'

const NewVersion: FC = () => {
	console.log('NewVersionPage Render')

	return (
		<div className={styles['container']}>
			<NewVersionForm />
		</div>
	)
}

export default NewVersion
