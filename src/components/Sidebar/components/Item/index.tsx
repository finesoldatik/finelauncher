import { FC } from 'react'
import { IItemProps } from './Item.interface'
import styles from './Item.module.scss'
import { useNavigate } from 'react-router-dom'

const Item: FC<IItemProps> = ({ element }) => {
	const navigate = useNavigate()

	return (
		<div
			className={
				element.active === element.id
					? styles['item'] + ' ' + styles['active']
					: styles['item']
			}
			onClick={() => {
				element.setActive(element.id)
				navigate(element.link)
			}}
		>
			<img src={element.image} alt='image' width='30px' />
		</div>
	)
}

export default Item
