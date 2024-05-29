import { FC } from 'react'
import ReactSelect, { SingleValue } from 'react-select'
import './VersionSelect.scss'
import {
	IVersionSelectProps,
	ISelectableVersion,
} from './VersionSelect.interface'

const VersionSelect: FC<IVersionSelectProps> = ({
	setVersion,
	versions,
	isLoading,
}) => {
	console.log('VersionSelect Render')

	const onChange = (newValue: SingleValue<string> | ISelectableVersion) => {
		// @ts-expect-error newValue.label: any хотя должно быть string
		const label: string = String(newValue.label)
		// @ts-expect-error newValue.value: any хотя должно быть string
		const value: string = String(newValue.value)

		console.log(label, value)
		// setCurrentVersion(value)
		setVersion({ label: label, value: value })
	}

	return (
		<ReactSelect
			classNamePrefix='version-select'
			onChange={onChange}
			options={versions}
			placeholder='Выберите версию'
			isLoading={isLoading}
			isDisabled={isLoading}
		/>
	)
}

export default VersionSelect
