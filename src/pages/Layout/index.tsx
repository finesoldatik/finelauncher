import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Sidebar from '../../components/generic/Sidebar'
import { Outlet, useLocation } from 'react-router-dom'
// import AlertsContainer from './components/NewAlert'

export default function Layout() {
	const location = useLocation()

	return (
		<div className='window'>
			{/* onContextMenu={event => event.preventDefault()} */}

			<Sidebar />
			<main>
				<div className='overflow-hidden'>
					<TransitionGroup>
						<CSSTransition
							key={location.pathname}
							timeout={300}
							classNames='page'
							unmountOnExit
						>
							<Outlet />
						</CSSTransition>
					</TransitionGroup>
				</div>
			</main>
		</div>
	)
}
