import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { Link } from 'react-router-dom'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

export interface ItemProps {
	active: number
	id: number
	setActive: (id: number, link: string) => void
	icon: IconDefinition
	link: string
	tooltip: string
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Item({
	active,
	id,
	setActive,
	icon,
	link,
	tooltip,
	setIsOpen,
}: ItemProps) {
	console.log('Sidebar Item Render')

	return (
		<label
			className='tooltip tooltip-primary tooltip-right w-full'
			data-tip={tooltip}
		>
			<Link
				className={`transition-all duration-200 ${
					active === id
						? 'btn btn-sm btn-primary join-item w-full h-10'
						: 'btn btn-sm join-item w-full'
				}`}
				to={link}
				onClick={() => {
					if (icon != faDownload) {
						console.log('SIDEBAR_ITEM > ELEMENT_LINK:', link)
						setActive(id, link)
						setIsOpen(false)
					} else setIsOpen(prev => !prev)
				}}
			>
				<FontAwesomeIcon icon={icon} />
			</Link>
		</label>
	)
}
