import { FC, useState } from 'react'
import ReactSelect, { SingleValue } from 'react-select'
import './VersionSelect.scss'
import {
	IVersionSelectProps,
	ISelectableVersion,
	CurrentVersion,
} from './VersionSelect.interface'

const VersionSelect: FC<IVersionSelectProps> = ({
	setVersion,
	versions,
	isLoading,
}) => {
	console.log('VersionSelect Render')

	const [currentVersion, setCurrentVersion] = useState<CurrentVersion>('')

	const getValue = () =>
		currentVersion ? versions.find(c => c.value === currentVersion) : ''

	const onChange = (newValue: SingleValue<string> | ISelectableVersion) => {
		// @ts-expect-error newValue.value: any хотя должно быть string
		const value: string = String(newValue.value)
		setCurrentVersion(value)
		setVersion({ label: String(getValue()), value: value })
	}

	return (
		<ReactSelect
			classNamePrefix='version-select'
			styles={{
				control: baseStyles => ({
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
