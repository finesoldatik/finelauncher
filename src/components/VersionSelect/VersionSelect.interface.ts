export interface ISelectableVersion {
	label: string
	value: string
}

type setVersion = React.Dispatch<React.SetStateAction<ISelectableVersion>>

interface versions {
	label: string
	value: string
}

export interface VersionSelectProps {
	setVersion: setVersion
	versions: versions[]
	isLoading: boolean
}

export type CurrentVersion = string
