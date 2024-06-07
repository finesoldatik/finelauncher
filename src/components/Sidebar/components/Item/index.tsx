import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IElement {
	id: number
	active: number
	setActive: (value: number) => void
	icon: IconDefinition
	link: string
	tooltip: string
}

export interface IItemProps {
	element: IElement
}

const Item: FC<IItemProps> = ({ element }) => {
	console.log('Sidebar Item Render')

	return (
		<div
			className='tooltip tooltip-primary tooltip-right w-full'
			data-tip={element.tooltip}
		>
			<Link
				className={
					element.active === element.id
						? `btn btn-sm btn-primary join-item w-full h-10`
						: 'btn btn-sm join-item w-full'
				}
				to={element.link}
				onClick={() => {
					element.setActive(element.id)
				}}
			>
				<FontAwesomeIcon icon={element.icon} />
			</Link>
		</div>
	)
}

export default Item
