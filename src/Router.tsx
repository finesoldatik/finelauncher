import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import Pages from './pages'

const router = createBrowserRouter([
	{
		path: '',
		element: <Layout />,
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
				path: '/versions/:name/:version',
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
				path: '/mods/:id',
				element: <Pages.Mod />,
			},
			{
				path: '/settings',
				element: <Pages.Settings />,
			},
		],
	},
])

const Router = () => {
	return <RouterProvider router={router} />
}

export default Router
