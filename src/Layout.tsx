import { FC } from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
	return (
		<>
			{/*  onContextMenu={event => event.preventDefault()} */}
			<main>
				<Outlet />
			</main>
			<Sidebar />
		</>
	)
}

export default Layout
