import { FC, useState } from 'react'
import ReactSelect, { SingleValue } from 'react-select'
import './VersionSelect.scss'
import {
	VersionSelectProps,
	ISelectableVersion,
	CurrentVersion,
} from './VersionSelect.interface'
// import api from '../../api.ts'

const VersionSelect: FC<VersionSelectProps> = ({
	setVersion,
	versions,
	isLoading,
}) => {
	const [currentVersion, setCurrentVersion] = useState<CurrentVersion>('')

	const getValue = () =>
		currentVersion ? versions.find(c => c.value === currentVersion) : ''

	const onChange = (newValue: SingleValue<string> | ISelectableVersion) => {
		// @ts-expect-error newValue.value: any хотя должно быть string
		const value: string = String(newValue.value)
		setCurrentVersion(value)
		setVersion({ label: value, value: String(getValue()) })
	}

	return (
		<ReactSelect
			classNamePrefix='version-select'
			styles={{
				control: (baseStyles) => ({
					...baseStyles,
				}),
			}}
			onChange={onChange}
			value={getValue()}
			options={versions}
			placeholder='Выберите версию'
			isLoading={isLoading}
			isDisabled={isLoading}
		/>
	)
}

export default VersionSelect
