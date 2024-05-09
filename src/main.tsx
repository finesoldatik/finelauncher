import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Pages from './pages'

const router = createBrowserRouter([
	{
		path: '',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Pages.Home />,
			},
			{
				path: '/versions',
				element: <Pages.Versions />,
			},
			{
				path: '/version',
				element: <Pages.Version />,
			},
			{
				path: '/new-version',
				element: <Pages.NewVersion />,
			},
			{
				path: '/mods',
				element: <Pages.Mods />,
			},
			{
				path: '/settings',
				element: <Pages.Settings />,
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')!).render(
	<RouterProvider router={router} />
)
