import { FC, useEffect, useState } from 'react'
import ReactSelect, { SingleValue } from 'react-select'
import './VersionSelect.scss'
import {
	VersionSelectProps,
	ISelectableVersion,
	CurrentVersion,
} from './interface.ts'
import api from '../../api.ts'

const VersionSelect: FC<VersionSelectProps> = ({ setVersion }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [currentVersion, setCurrentVersion] = useState<CurrentVersion>('')
	const [versions, setVersions] = useState<ISelectableVersion[]>([])

	useEffect(() => {
		api.getInstalledVersions().then(value => {
			const entries: ISelectableVersion[] = value.map(version => ({
				label: String(version.name),
				value: String(version.name),
			}))
			console.log(entries)
			setVersions(entries)
			setIsLoading(false)
		})
	}, [])

	const getValue = () =>
		currentVersion ? versions.find(c => c.value === currentVersion) : ''

	const onChange = (newValue: SingleValue<string> | ISelectableVersion) => {
		// @ts-expect-error newValue.value: any хотя должно быть string
		const value: string = String(newValue.value)
		setCurrentVersion(value)
		setVersion(value)
	}

	return (
		<ReactSelect
			classNamePrefix='version-select'
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
