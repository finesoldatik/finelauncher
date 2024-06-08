import Item from './components/Item'
import { topItems, bottomItems } from './data.ts'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { FC } from 'react'

const Sidebar: FC = () => {
	console.log('Sidebar Render')

	const settingsContext = useSettingsContext()

	return (
		<>
			<div
				className='flex h-screen bg-base-300 flex-col justify-between flex-grow-0 flex-shrink-0 basis-12'
				// onContextMenu={event => event.preventDefault()}
			>
				<div className='join join-vertical flex-col mt-1'>
					{topItems.map(el => (
						<Item
							element={{
								...el,
								active: settingsContext.tabId,
								setActive: settingsContext.setTab,
							}}
							key={el.id}
						/>
					))}
				</div>

				<div className='flex-col mb-1'>
					{bottomItems.map(el => (
						<Item
							element={{
								...el,
								active: settingsContext.tabId,
								setActive: settingsContext.setTab,
							}}
							key={el.id}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default Sidebar
