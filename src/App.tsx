import Titlebar from './components/titlebar/Titlebar'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/sidebar/Sidebar'

export default function App() {
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
