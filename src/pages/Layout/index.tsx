import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Sidebar from '../../components/generic/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { bottomItems, topItems } from '../../components/generic/Sidebar/items'
import { useRef } from 'react'

export default function Layout() {
	const settingsContext = useSettingsContext()

	const pageTopRef = useRef(null)
	const pageDownRef = useRef(null)

	return (
		<div className='window'>
			{/* onContextMenu={event => event.preventDefault()} */}

			<Sidebar />
			<main>
				<div className='overflow-hidden'>
					<TransitionGroup>
						{topItems
							.map(val => val.link)
							.includes(settingsContext.currentPage) && (
							<CSSTransition
								key={settingsContext.currentPage}
								timeout={200}
								classNames='page-top'
								appear
								nodeRef={pageTopRef}
							>
								<div ref={pageTopRef}>
									<Outlet />
								</div>
							</CSSTransition>
						)}
						{bottomItems
							.map(val => val.link)
							.includes(settingsContext.currentPage) && (
							<CSSTransition
								key={settingsContext.currentPage}
								timeout={200}
								classNames='page-down'
								appear
								nodeRef={pageDownRef}
							>
								<div ref={pageDownRef}>
									<Outlet />
								</div>
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</main>
		</div>
	)
}
