type GetValue = <T = any>(key: string) => T | null
type SetValue = <T = any>(key: string, value: T) => void

export const getValue: GetValue = key => {
	const storage = localStorage.getItem(key) // string || null

	if (storage) {
		return JSON.parse(storage)
	}

	return null
}

export const setValue: SetValue = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value))
}
