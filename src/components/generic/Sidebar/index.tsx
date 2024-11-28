import React, { useMemo, useState } from 'react'
import Item from './Item'
import { topItems, bottomItems, items } from './items.ts'
import { useSettingsContext } from '../../../contexts/SettingsProvider'
import LeftDrawer from '../LeftDrawer/index.tsx'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
	console.log('Sidebar Render')

	const [isOpen, setIsOpen] = useState(false)

	const { state, dispatch } = useSettingsContext()

	const filteredTopItems = useMemo(() => {
		return topItems.map((el, idx) => (
			<Item
				id={el.id}
				icon={el.icon}
				link={el.link}
				tooltip={state.translation.translatable(el.tooltip)}
				active={state.currentTab}
				setActive={() => {
					dispatch({ type: 'SET_TAB', payload: el.id })
					dispatch({ type: 'SET_PAGE', payload: el.link })
				}}
				setIsOpen={setIsOpen}
				key={idx}
			/>
		))
	}, [state.currentPage, state.translation])

	const filteredBottomItems = useMemo(() => {
		return bottomItems.map((el, idx) => (
			<Item
				id={el.id}
				icon={el.icon}
				link={el.link}
				tooltip={state.translation.translatable(el.tooltip)}
				active={state.currentTab}
				setActive={() => {
					dispatch({ type: 'SET_TAB', payload: el.id })
					dispatch({ type: 'SET_PAGE', payload: el.link })
				}}
				setIsOpen={setIsOpen}
				key={idx}
			/>
		))
	}, [state.currentPage, state.translation])

	const isAnotherPage = useMemo(
		() => state.currentTab == items.length + 1,
		[state.currentTab]
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
							link={state.currentPage}
							tooltip={state.translation.translatable('anotherPage.tooltip')}
							active={state.currentTab}
							setActive={() => {
								dispatch({ type: 'SET_TAB', payload: items.length + 1 })
								dispatch({ type: 'SET_PAGE', payload: state.currentPage })
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
}
