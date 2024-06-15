import { fs, path } from '@tauri-apps/api'
import { launcherDirName, normalizeFilename } from './instanceManager'

export const getThemesPath = async () => {
	return path.documentDir().then(v => path.join(v, launcherDirName, 'themes'))
}

export const getThemePath = async (themeName: string) => {
	return getThemesPath().then(v => path.join(v, normalizeFilename(themeName)))
}

export const getThemeContent = async (themeName: string) => {
	const data = JSON.parse(
		await getThemePath(themeName).then(v => fs.readTextFile(`${v}.json`))
	) as ThemeContent

	return data
}

export const getThemesContent = async () => {
	const themes = await getThemes()
	return Promise.all(
		themes.map(async theme => {
			const data = JSON.parse(await fs.readTextFile(theme.path)) as ThemeContent

			return data
		})
	)
}

export const getThemes = async () => {
	return fs
		.readDir(await getThemesPath(), {
			dir: fs.BaseDirectory.Document,
			recursive: true,
		})
		.catch(() => {
			getThemesPath().then(v => fs.createDir(v, { recursive: true }))
			return []
		})
}

export const themeExists = async (themeName: string) => {
	return fs.exists(await getThemePath(themeName))
}

export interface ThemeContent {
	'color-scheme': string
	fontFamily?: string
	primary: string
	'primary-content'?: string
	secondary: string
	'secondary-content'?: string
	accent: string
	'base-100': string
	'base-200'?: string
	'base-300'?: string
	'base-content'?: string
	neutral: string
	'neutral-content'?: string
	info: string
	success: string
	warning: string
	error: string
	'--rounded-box'?: string
	'--rounded-btn'?: string
	'--rounded-badge'?: string
	'--animation-btn'?: string
	'--animation-input'?: string
	'--btn-focus-scale'?: string
	'--tab-radius'?: string
}
