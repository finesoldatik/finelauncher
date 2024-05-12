export type setVersion = React.Dispatch<React.SetStateAction<string>>

export interface IProps {
	setVersion: setVersion
}

export interface ISelectableVersion {
  label: string
  value: string
}

export type CurrentVersion = string
