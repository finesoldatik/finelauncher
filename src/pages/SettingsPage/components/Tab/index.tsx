import { FC, ReactNode } from 'react'

interface ITabProps {
	title: string
	id: number
	currentTab: number
	setCurrentTab: (value: number) => void
	children: ReactNode
	styles?: string
}

const Tab: FC<ITabProps> = ({
	title,
	id,
	currentTab,
	setCurrentTab,
	children,
	styles,
}) => {
	console.log('Tab Render')

	return (
		<>
			<input
				type='radio'
				className='tab'
				aria-label={title}
				onChange={event => event.target.checked && setCurrentTab(id)}
				checked={currentTab === id}
			/>
			<div
				className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${styles}`}
			>
				{children}
			</div>
		</>
	)
}

export default Tab
