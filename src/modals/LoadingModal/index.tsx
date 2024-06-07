import styles from './LoadingModal.module.css'

export default function LoadingModal() {
	return (
		<div className={styles['modal']}>
			<span className='loading loading-ring loading-lg'></span>
			<h3>Идет загрука...</h3>
		</div>
	)
}
