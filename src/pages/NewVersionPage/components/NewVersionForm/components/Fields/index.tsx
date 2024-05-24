import { FC } from 'react'
import NewVersionNameInput from '../NewVersionNameInput'
import NewVersionSelect from '../NewVersionSelect'
import { IFieldsProps } from './Fields.interface.ts'

const Fields: FC<IFieldsProps> = ({
	NewVersionNameInputProps,
	NewVersionSelectProps,
}) => {
	return (
		<>
			<NewVersionNameInput
				register={NewVersionNameInputProps.register}
				errors={NewVersionNameInputProps.errors}
				existsVersion={NewVersionNameInputProps.existsVersion}
			/>

			<NewVersionSelect
				versionChanged={NewVersionSelectProps.versionChanged}
				setCurrentVersion={NewVersionSelectProps.setCurrentVersion}
			/>
		</>
	)
}

export default Fields
