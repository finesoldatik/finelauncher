import { FC } from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'
import AlertsContainer from './components/NewAlert'

const Layout: FC = () => {
	return (
		<>
			{/*  onContextMenu={event => event.preventDefault()} */}
			<Sidebar />
			<main>
				<Outlet />
				<AlertsContainer />
			</main>
		</>
	)
}

export default Layout
