import { useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import './VersionSelect.scss'
import Util from '../../utils/version/index'
import { os } from '@tauri-apps/api'

export default function VersionSelect({ setVersion, ...props }) {
	const [isLoading, setIsLoading] = useState(true)
	const [currentVersion, setCurrentVersion] = useState('')
	const [versions, setVersions] = useState([])

	useEffect(() => {
		const versionWrapper = new Util()

		const getVersions = async () => {
			const platform = await os.platform()
			let versions: object[]

			if (platform === 'win32') versions = versionWrapper.getWindowsVersions()
			else if (platform === 'linux')
				versions = versionWrapper.getLinuxVersions()

			versions = versions.map(version => ({
				...version,
				label: `${version.repository} ${version.name}`,
				value: version.url,
			}))

			setVersions(versions)
			setIsLoading(false)
		}
		versionWrapper.getRepositories().then(() => getVersions())
	}, [])

	const getValue = () =>
		currentVersion ? versions.find(c => c.value === currentVersion) : ''

	const onChange = (newValue: any) => {
		setCurrentVersion(newValue.value)
		setVersion(newValue.value)
	}

	return (
		<ReactSelect
			{...props}
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
