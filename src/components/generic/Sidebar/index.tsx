import Item from './Item'
import { topItems, bottomItems } from './items.ts'
import { useSettingsContext } from '../../../contexts/SettingsProvider'
import { useState } from 'react'
import LeftDrawer from '../LeftDrawer/index.tsx'

export default function Sidebar() {
	console.log('Sidebar Render')

	const [isOpen, setIsOpen] = useState(false)

	const settingsContext = useSettingsContext()

	return (
		<>
			<LeftDrawer isOpen={isOpen} setIsOpen={setIsOpen} title='Загрузки'></LeftDrawer>
			<div
				className='flex flex-col justify-between flex-grow-0 flex-shrink-0 basis-12 h-screen bg-base-300 z-[1000]'
				onContextMenu={event => event.preventDefault()}
			>
				<div className='flex join join-vertical mt-1'>
					{topItems.map(el => (
						<Item
							element={{
								...el,
								tooltip: '1', //settingsContext.translation.translatable(el.tooltip)
								active: settingsContext.tabId,
								setActive: settingsContext.setTab,
								setIsOpen: setIsOpen,
							}}
							key={el.id}
						/>
					))}
				</div>

				<div className='flex join join-vertical mb-1'>
					{bottomItems.map(el => (
						<Item
							element={{
								...el,
								tooltip: '1', //settingsContext.translation.translatable(el.tooltip)
								active: settingsContext.tabId,
								setActive: settingsContext.setTab,
								setIsOpen: setIsOpen,
							}}
							key={el.id}
						/>
					))}
				</div>
			</div>
		</>
	)
}
