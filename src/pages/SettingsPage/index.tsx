import { FC } from 'react'
import GreatContribution from './components/GreatContribution'
import ProductsUsed from './components/ProductsUsed'
import styles from './SettingsPage.module.scss'

const SettingsPage: FC = () => {
	return (
		<div className={styles['container']}>
			<GreatContribution />
			<ProductsUsed />
		</div>
	)
}

export default SettingsPage
