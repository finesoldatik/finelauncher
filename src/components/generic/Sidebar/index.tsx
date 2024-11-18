import Item from './Item'
import { topItems, bottomItems, items } from './items.ts'
import { useSettingsContext } from '../../../contexts/SettingsProvider'
import { useState } from 'react'
import LeftDrawer from '../LeftDrawer/index.tsx'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
	console.log('Sidebar Render')

	const [isOpen, setIsOpen] = useState(false)

	const settingsContext = useSettingsContext()

	return (
		<>
			<LeftDrawer
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				title='Загрузки'
			></LeftDrawer>
			<div
				className='flex flex-col justify-between flex-grow-0 flex-shrink-0 basis-12 h-screen bg-base-300 z-[1000]'
				onContextMenu={event => event.preventDefault()}
			>
				<div className='flex join join-vertical mt-1'>
					{topItems.map((el, idx) => (
						<Item
							icon={el.icon}
							link={el.link}
							tooltip={settingsContext.translation.translatable(el.tooltip)}
							active={settingsContext.currentPage}
							setActive={settingsContext.setPage}
							setIsOpen={setIsOpen}
							key={idx}
						/>
					))}
					{!items.filter(val => val.link == settingsContext.currentPage)
						.length ? (
						<Item
							icon={faNoteSticky}
							link={settingsContext.currentPage}
							tooltip={settingsContext.translation.translatable(
								'anotherPage.tooltip'
							)}
							active={settingsContext.currentPage}
							setActive={settingsContext.setPage}
							setIsOpen={setIsOpen}
						/>
					) : (
						<></>
					)}
				</div>

				<div className='flex join join-vertical mb-1'>
					{bottomItems.map((el, idx) => (
						<Item
							icon={el.icon}
							link={el.link}
							tooltip={settingsContext.translation.translatable(el.tooltip)}
							active={settingsContext.currentPage}
							setActive={settingsContext.setPage}
							setIsOpen={setIsOpen}
							key={idx}
						/>
					))}
				</div>
			</div>
		</>
	)
}
