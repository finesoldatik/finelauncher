import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

interface Element {
	active: string
	setActive: (value: string) => void
	icon: IconDefinition
	link: string
	tooltip: string
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ItemProps {
	element: Element
}

export default function Item({ element }: ItemProps) {
	console.log('Sidebar Item Render')

	return (
		<label
			className='tooltip tooltip-primary tooltip-right w-full'
			data-tip={element.tooltip}
		>
			<Link
				className={
					element.active === element.link
						? `btn btn-sm btn-primary join-item w-full h-10`
						: 'btn btn-sm join-item w-full'
				}
				to={element.link}
				onClick={() => {
					if (element.icon != faDownload) {
						console.log('SIDEBAR_ITEM > ELEMENT_LINK:', element.link)
						element.setActive(element.link)
						element.setIsOpen(false)
					} else element.setIsOpen(prev => !prev)
				}}
			>
				<FontAwesomeIcon icon={element.icon} />
			</Link>
		</label>
	)
}
