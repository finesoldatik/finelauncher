import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Sidebar from '../../components/generic/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { bottomItems, topItems } from '../../components/generic/Sidebar/items'

export default function Layout() {
	const settingsContext = useSettingsContext()

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
								timeout={300}
								classNames='page-top'
								unmountOnExit
							>
								<Outlet />
							</CSSTransition>
						)}
						{bottomItems
							.map(val => val.link)
							.includes(settingsContext.currentPage) && (
							<CSSTransition
								key={settingsContext.currentPage}
								timeout={300}
								classNames='page-down'
								unmountOnExit
							>
								<Outlet />
							</CSSTransition>
						)}
					</TransitionGroup>
				</div>
			</main>
		</div>
	)
}
