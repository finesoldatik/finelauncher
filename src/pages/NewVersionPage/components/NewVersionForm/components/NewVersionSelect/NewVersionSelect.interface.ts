import { ISelectableVersion } from '../../../../../../components/VersionSelect/VersionSelect.interface'

export interface INewVersionSelectProps {
	setCurrentVersion: (value: ISelectableVersion) => void
	versionChanged: boolean
}
