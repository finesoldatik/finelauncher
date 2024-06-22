import { getValue, setValue } from './localStorage'

import Languages from './Languages'
import { fs, path } from '@tauri-apps/api'
import { getLauncherPath } from './instanceManager'

export type Translation = {
	[index: string]: string | undefined

	_name: string
}

export default class TranslatableText {
	defaultLanguage: string
	language: string
	translations: Map<string, Translation>

	constructor() {
		this.defaultLanguage = 'ru_ru'

		this.language = getValue('language') ?? this.defaultLanguage
		this.translations = new Map()

		this.reloadLanguages()
	}

	setLanguage(id: string) {
		this.language = id
		setValue('language', id)
		console.log('Changed language to', id)
	}

	async reloadLanguages() {
		// Default languages
		this.translations = new Map(Object.entries(Languages))

		const translationsDir = await path.join(
			await getLauncherPath(),
			'languages'
		)

		if (!(await fs.exists(translationsDir)))
			fs.createDir(translationsDir, { recursive: true })

		const files = (await fs.readDir(translationsDir)).filter(f => !f.children)

		files.forEach(async file => {
			const basename = await path.basename(file.name as string)
			const translation = (await fs
				.readTextFile(file.path)
				.then(JSON.parse)) as Translation

			this.translations.set(basename, translation)
		})
	}

	translatable(id: string) {
		return (
			this.getCurrentTranslation()[id] ?? this.getDefaultTranslation()[id] ?? id
		)
	}

	private getCurrentTranslation() {
		return this.translations.get(this.language) as Translation
	}

	private getDefaultTranslation() {
		return this.translations.get(this.defaultLanguage) as Translation
	}

	getLanguageNames() {
		return [...this.translations.entries()].map(([key, value]) => ({
			id: key,
			name: value._name,
		}))
	}
}
