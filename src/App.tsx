import Titlebar from './components/Titlebar/Titlebar'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar/Sidebar'

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
