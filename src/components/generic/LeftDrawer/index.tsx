import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode } from 'react'

interface LeftDrawerProps {
	title?: string
	children?: ReactNode
	isOpen: boolean
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function LeftDrawer({
	title,
	children,
	isOpen,
	setIsOpen,
}: LeftDrawerProps) {
	const toggleDrawer = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<div
			className={`fixed top-0 left-12 w-64 h-full bg-base-200 shadow-lg
                 transform z-[999] shadow-black ${
										isOpen ? 'translate-x-0' : '-translate-x-[calc(100%+48px)]'
									}`}
			style={{
				transition: 'background-color 0.3s ease-out, transform 0.2s ease-out',
			}}
		>
			<div className='p-4'>
				<h2 className='text-xl font-semibold mb-4'>{title}</h2>
				<div>{children}</div>
			</div>
			<button
				title='Скрыть'
				onClick={toggleDrawer}
				className='absolute top-4 right-4'
			>
				<FontAwesomeIcon icon={faCaretLeft} />
			</button>
		</div>
	)
}
