import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import LoadingModal from './modals/LoadingModal'
import Pages from './pages'
import { Suspense } from 'react'
import './index.css'

// <LoadingModal />

const router = createBrowserRouter([
	{
		path: '',
		element: (
			<Suspense fallback={<></>}>
				<Pages.Layout />
			</Suspense>
		),
		errorElement: <Pages.NotFound />,
		children: [
			{
				path: '/',
				element: <Pages.Instances />,
			},
			{
				path: '/instances/:name',
				element: <Pages.Instances />,
			},
			{
				path: '/new-instance',
				element: <Pages.NewInstance />,
			},
			{
				path: '/voxelworld/:instance',
				element: <Pages.VoxelWorld />,
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
