import React, { useMemo, useState } from 'react'
import Item from './Item'
import { topItems, bottomItems, items } from './items.ts'
import { useSettingsContext } from '../../../contexts/SettingsProvider'
import LeftDrawer from '../LeftDrawer/index.tsx'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'

const Sidebar = React.memo(() => {
	console.log('Sidebar Render')

	const [isOpen, setIsOpen] = useState(false)

	const settingsContext = useSettingsContext()

	const filteredTopItems = useMemo(() => {
		return topItems.map((el, idx) => (
			<Item
				id={el.id}
				icon={el.icon}
				link={el.link}
				tooltip={settingsContext.translation.translatable(el.tooltip)}
				active={settingsContext.currentTab}
				setActive={(id, link) => {
					settingsContext.setCurrentTab(id)
					settingsContext.setCurrentPage(link)
				}}
				setIsOpen={setIsOpen}
				key={idx}
			/>
		))
	}, [settingsContext.currentPage, settingsContext.translation])

	const filteredBottomItems = useMemo(() => {
		return bottomItems.map((el, idx) => (
			<Item
				id={el.id}
				icon={el.icon}
				link={el.link}
				tooltip={settingsContext.translation.translatable(el.tooltip)}
				active={settingsContext.currentTab}
				setActive={(id, link) => {
					settingsContext.setCurrentTab(id)
					settingsContext.setCurrentPage(link)
				}}
				setIsOpen={setIsOpen}
				key={idx}
			/>
		))
	}, [settingsContext.currentPage, settingsContext.translation])

	const isAnotherPage = useMemo(
		() => settingsContext.currentTab == items.length + 1,
		[settingsContext.currentTab]
	)

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
					{filteredTopItems}
					{isAnotherPage ? (
						<Item
							id={items.length + 1}
							icon={faNoteSticky}
							link={settingsContext.currentPage}
							tooltip={settingsContext.translation.translatable(
								'anotherPage.tooltip'
							)}
							active={settingsContext.currentTab}
							setActive={(id, link) => {
								settingsContext.setCurrentTab(id)
								settingsContext.setCurrentPage(link)
							}}
							setIsOpen={setIsOpen}
						/>
					) : (
						<></>
					)}
				</div>

				<div className='flex join join-vertical mb-1'>
					{filteredBottomItems}
				</div>
			</div>
		</>
	)
})

export default Sidebar
