import { useEffect, useState } from 'react'
import NewVersion from '../../components/newVersion/NewVersion'
import Version from '../../components/version/Version'
import api from '../../api'
import { IVersion } from './interface.ts'

export default function Versions() {
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
					versions.map((el, idx) => <Version props={el} key={idx} />)
				) : (
					<Version
						props={{
							name: 'Версий не найдено',
							version: 'VE или RVE, вот в чем вопрос',
							isVersion: false,
						}}
					/>
				)}
			</div>
		</>
	)
}
