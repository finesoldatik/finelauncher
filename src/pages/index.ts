import { lazy } from 'react'

// import Layout from './Layout'
// import Home from './pages/HomePage'
// import Versions from './pages/VersionsPage'
// import Version from './pages/VersionPage'
// import NewVersion from './pages/NewVersionPage'
// import Mods from './pages/ModsPage'
// import Mod from './pages/ModPage'
// import Settings from './pages/SettingsPage'

const Layout = lazy(() => import('../Layout.tsx'))
const Home = lazy(() => import('./HomePage'))
const Instances = lazy(() => import('./InstancesPage'))
const NewInstance = lazy(() => import('./NewInstancePage'))
const Instance = lazy(() => import('./InstancePage'))
const Mods = lazy(() => import('./ModsPage'))
const Mod = lazy(() => import('./ModPage'))
const Settings = lazy(() => import('./SettingsPage'))

export default {
	Layout,
	Home,
	Instances,
	NewInstance,
	Instance,
	Mods,
	Mod,
	Settings,
}
