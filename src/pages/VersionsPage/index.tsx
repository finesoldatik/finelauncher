import { FC, useEffect, useState } from 'react'
import NewVersion from './components/NewVersion/index.tsx'
import Version from './components/Version/index.tsx'
import api from '../../api'
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
		api.getInstalledVersions().then(value => {
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
						version={'VE или RVE, а может быть DERBIS?'}
						isVersion={false}
					/>
				)}
			</div>
		</>
	)
}

export default VersionsPage
