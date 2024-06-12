import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoadingModal from './modals/LoadingModal'
import Pages from './pages'
import { Suspense } from 'react'
import Overlay from './Overlay'

const router = createBrowserRouter([
	{
		path: '/overlay',
		element: <Overlay />,
	},
	{
		path: '',
		element: (
			<Suspense fallback={<LoadingModal />}>
				<Pages.Layout />
			</Suspense>
		),
		children: [
			{
				path: '/',
				element: <Pages.Home />,
			},
			{
				path: '/instances',
				element: <Pages.Instances />,
			},
			{
				path: '/instances/:name',
				element: <Pages.Instance />,
			},
			{
				path: '/new-instance',
				element: <Pages.NewInstance />,
			},
			{
				path: '/mods',
				element: <Pages.Mods />,
			},
			{
				path: '/settings',
				element: <Pages.Settings />,
			},
			{
				path: '/about',
				element: <Pages.About />,
			},
		],
	},
])

export default function Router() {
	return <RouterProvider router={router} />
}
