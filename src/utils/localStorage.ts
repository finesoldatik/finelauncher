'use client'
type GetValue = (key: string) => any
type SetValue = (value: any, key: string) => void

export const getValue: GetValue = (key: string) => {
	const storage = localStorage.getItem(key) // string || null

	if (storage) {
		return JSON.parse(storage)
	}

	return null
}

export const setValue: SetValue = (value: any, key: string) => {
	localStorage.setItem(key, JSON.stringify(value))
}
