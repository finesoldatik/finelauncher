import { INewVersion } from '../../pages/NewVersionPage/interface'

type setVersion = React.Dispatch<
	React.SetStateAction<INewVersion | undefined>
>

export interface NewVersionSelectProps {
	setVersion: setVersion
}

export interface ISelectableVersion {
	label: string
	value: string
}

export type CurrentVersion = string
