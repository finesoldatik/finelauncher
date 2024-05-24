import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { ISelectableVersion } from '../../../../../../components/VersionSelect/VersionSelect.interface'

export interface INewVersionNameInputProps {
	register: UseFormRegister<ISelectableVersion>
	errors: FieldErrors<ISelectableVersion>
	existsVersion: boolean
}
