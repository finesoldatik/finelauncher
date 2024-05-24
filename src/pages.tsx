import { lazy } from 'react'
// import Layout from './Layout'
// import Home from './pages/HomePage'
// import Versions from './pages/VersionsPage'
// import Version from './pages/VersionPage'
// import NewVersion from './pages/NewVersionPage'
// import Mods from './pages/ModsPage'
// import Mod from './pages/ModPage'
// import Settings from './pages/SettingsPage'

const Layout = lazy(() => import('./Layout.tsx'))
const Home = lazy(() => import('./pages/HomePage'))
const Versions = lazy(() => import('./pages/VersionsPage'))
const NewVersion = lazy(() => import('./pages/NewVersionPage'))
const Version = lazy(() => import('./pages/VersionPage'))
const Mods = lazy(() => import('./pages/ModsPage'))
const Mod = lazy(() => import('./pages/ModPage'))
const Settings = lazy(() => import('./pages/SettingsPage'))

export default {
	Layout,
	Home,
	Versions,
	Version,
	NewVersion,
	Mods,
	Mod,
	Settings,
}
