import Sidebar from '../../components/generic/Sidebar'
import { Outlet } from 'react-router-dom'
// import AlertsContainer from './components/NewAlert'

export default function Layout() {
	return (
		<div className='window'>
			{/* onContextMenu={event => event.preventDefault()} */}

			<Sidebar />
			<main>
				<Outlet />
			</main>
		</div>
	)
}
