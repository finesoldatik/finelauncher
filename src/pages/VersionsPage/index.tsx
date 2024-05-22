import { FC, useEffect, useState } from 'react'
import NewVersion from './components/NewVersion/index.tsx'
import Version from './components/Version/index.tsx'
import { getInstalledInstances } from '../../utils/versionManager'
import { IVersion } from './VersionsPage.interface.ts'

const VersionsPage: FC = () => {
	const [versions, setVersions] = useState<IVersion[]>([
		{
			name: 'Загрузка версий',
			version: 'VE Пожалуйста подождите',
			isVersion: false,
		},
	])
	useEffect(() => {
		getInstalledInstances().then(value => {
			const entries: IVersion[] = value.map(version => ({
				name: version.name,
				version: 'VE v12',
				isVersion: true,
			}))
			console.log(entries)
			setVersions(entries)
		})
	}, [])
	return (
		<>
			<div className='versions'>
				<NewVersion />
				{versions.length ? (
					versions.map((el, idx) => (
						<Version
							name={el.name}
							version={el.version}
							isVersion={el.isVersion}
							key={idx}
						/>
					))
				) : (
					<Version
						name='Версий не найдено'
						version={'VE или RVE, что выберешь ты?'}
						isVersion={false}
					/>
				)}
			</div>
		</>
	)
}

export default VersionsPage
