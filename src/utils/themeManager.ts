import { fs, path } from '@tauri-apps/api'
import { getLauncherPath } from './instanceManager'

export const getThemesPath = async () => {
	return path.join(await getLauncherPath(), 'themes')
}

export const loadCustomThemes = async () => {
	getThemesPath().then(async value => {
		fs.readDir(value)
			.then(files => {
				const themes = files.filter(
					file => String(file.name?.split('.').pop()) === 'css'
				)

				themes.forEach(theme => {
					console.log(theme.path)
					// import(theme.path)
				})
			})
			.catch(() =>
				getThemesPath().then(v => fs.createDir(v, { recursive: true }))
			)
	})
}
