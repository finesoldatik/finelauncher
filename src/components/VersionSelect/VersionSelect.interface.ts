export interface ISelectableVersion {
	label: string
	value: string
}

type setVersion = (value: ISelectableVersion) => void

interface IVersion {
	label: string
	value: string
}

export interface IVersionSelectProps {
	setVersion: setVersion
	versions: IVersion[]
	isLoading: boolean
}

export type CurrentVersion = string
