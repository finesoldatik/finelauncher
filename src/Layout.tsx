import { FC } from 'react'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>
			<Sidebar />
		</>
	)
}

export default Layout
