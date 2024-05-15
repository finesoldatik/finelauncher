import { INewVersion } from '../../pages/NewVersionPage/interface'

export type setVersion = React.Dispatch<
	React.SetStateAction<INewVersion | undefined>
>

export interface IProps {
	setVersion: setVersion
}

export interface ISelectableVersion {
	label: string
	value: string
}

export type CurrentVersion = string
