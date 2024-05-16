import { FC, useEffect, useState } from 'react'
import ReactSelect, { SingleValue } from 'react-select'
import './NewVersionSelect.scss'
import Util, { IVersion } from '../../utils/version/index'
import { os } from '@tauri-apps/api'
import { NewVersionSelectProps, ISelectableVersion, CurrentVersion } from './interface.ts'

const NewVersionSelect: FC<NewVersionSelectProps> = (props) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [currentVersion, setCurrentVersion] = useState<CurrentVersion>('')
	const [versions, setVersions] = useState<ISelectableVersion[]>([])

	useEffect(() => {
		const versionWrapper = new Util()

		const getVersions = async () => {
			const platform = await os.platform()
			let releases: IVersion[] = []

			if (platform === 'win32') releases = versionWrapper.getWindowsVersions()
			else if (platform === 'linux')
				releases = versionWrapper.getLinuxVersions()

			const versionList = releases.map(version => ({
				label: `${version.repository} ${version.name}`,
				value: version.url,
			}))

			setVersions(versionList)
			setIsLoading(false)
		}
		versionWrapper.getRepositories().then(() => getVersions())
	}, [])

	const getValue = () =>
		currentVersion ? versions.find(c => c.value === currentVersion) : ''

	const onChange = (newValue: SingleValue<string> | ISelectableVersion) => {
		// @ts-expect-error newValue.value: any хотя должно быть string
		const value: string = String(newValue.value)
		setCurrentVersion(value)
		props.setVersion({ name: value, version: String(getValue()) })
	}

	return (
		<ReactSelect
			classNamePrefix='new-version-select'
			onChange={onChange}
			value={getValue()}
			options={versions}
			placeholder='Выберите версию'
			isLoading={isLoading}
			isDisabled={isLoading}
		/>
	)
}

export default NewVersionSelect
