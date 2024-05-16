export type setVersion = React.Dispatch<React.SetStateAction<string>>

export interface VersionSelectProps {
	setVersion: setVersion
}

export interface ISelectableVersion {
  label: string
  value: string
}

export type CurrentVersion = string
