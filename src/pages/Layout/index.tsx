import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Sidebar from '../../components/generic/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { bottomItems, topItems } from '../../components/generic/Sidebar/items'
import { useMemo, useRef } from 'react'
import SnowflakeAnimation from '../../components/generic/SnowflakeAnimation'

const handleContextMenu = (_event: any) => {} //event.preventDefault()

export default function Layout() {
	const settingsContext = useSettingsContext()

	const pageTopRef = useRef(null)
	const pageDownRef = useRef(null)

	const page = useMemo(
		() => ({
			isTop: topItems
				.map(val => val.link)
				.includes(settingsContext.currentPage),
			isBottom: bottomItems
				.map(val => val.link)
				.includes(settingsContext.currentPage),
		}),
		[settingsContext.currentPage]
	)

	return (
		<>
			{settingsContext.fallingSnowflakes && (
				<SnowflakeAnimation snowflakeCount={settingsContext.snowflakeCount} />
			)}
			<div className='window' onContextMenu={handleContextMenu}>
				<Sidebar />

				<main>
					<TransitionGroup>
						{page.isTop && (
							<CSSTransition
								key={settingsContext.currentPage}
								timeout={200}
								classNames='page-top'
								appear
								nodeRef={pageTopRef}
							>
								<div ref={pageTopRef} className='overflow-y-auto'>
									<Outlet />
								</div>
							</CSSTransition>
						)}
						{page.isBottom && (
							<CSSTransition
								key={settingsContext.currentPage}
								timeout={200}
								classNames='page-down'
								appear
								nodeRef={pageDownRef}
							>
								<div ref={pageDownRef} className='overflow-y-auto'>
									<Outlet />
								</div>
							</CSSTransition>
						)}
					</TransitionGroup>
				</main>
			</div>
		</>
	)
}
