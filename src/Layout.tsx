import { FC } from 'react'
import Titlebar from './components/Titlebar'
import Sidebar from './components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout: FC = () => {
	return (
		<>
			<Titlebar />
			<div className='container'>
				<main>
					<div className='content'>
						<Outlet />
					</div>
				</main>
				<Sidebar />
			</div>
		</>
	)
}

export default Layout
