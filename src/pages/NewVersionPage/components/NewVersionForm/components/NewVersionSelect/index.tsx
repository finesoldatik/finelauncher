import { FC, memo, useEffect, useState } from 'react'
import styles from './NewVersionSelect.module.scss'
import { INewVersionSelectProps } from './NewVersionSelect.interface'
import VersionSelect from '../../../../../../components/VersionSelect'
import { ISelectableVersion } from '../../../../../../components/VersionSelect/VersionSelect.interface'
import Util, { IVersion } from '../../../../../../utils/version/index'
import { os } from '@tauri-apps/api'

const NewVersionSelect: FC<INewVersionSelectProps> = memo(
	({ setCurrentVersion, versionChanged }) => {
		console.log('NewVersionSelect Render')

		const [versions, setVersions] = useState<ISelectableVersion[]>([])
		const [isLoading, setIsLoading] = useState<boolean>(true)

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

		return (
			<>
				<p className={styles['mt-10']}>* Обязательное поле</p>
				<p className={`violet-text ${styles['mb-10']}`}>Выберите версию</p>

				<VersionSelect
					setVersion={setCurrentVersion}
					versions={versions}
					isLoading={isLoading}
				/>

				{!versionChanged && <p className='error-text'>Выберите версию!</p>}
			</>
		)
	}
)

export default NewVersionSelect
