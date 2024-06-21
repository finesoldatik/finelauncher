import { Link } from 'react-router-dom'
import styles from './SuccessModal.module.css'

export default function SuccessModal({
	active,
	title,
	btnTitle,
	btnLink,
}: {
	active: boolean
	title: string
	btnTitle: string
	btnLink: string
}) {
	return (
		<div
			className={
				active ? `${styles['modal']} ${styles['active']}` : styles['modal']
			}
		>
			<div className='flex flex-col'>
				<h1 className='text-2xl'>{title}</h1>
				<h3 className='text-lg mt-1'>Давайте вернемся в</h3>
				<Link className='btn btn-primary mt-3' to={btnLink}>
					{btnTitle}
				</Link>
			</div>
		</div>
	)
}
