import { FC, useEffect, useState } from 'react'
import { IVersion } from './Versions.interface'
import { getInstalledInstances } from '../../../../utils/versionManager'
import Version from '../Version'

const Versions: FC = () => {
	const [instances, setInstances] = useState<IVersion[]>([])

	console.log('Versions Render')

	useEffect(() => {
		getInstalledInstances().then(value => {
			const entries = value.map(version => {
				const content = version.children?.filter(value => {
					console.log(version)
					if (value.name !== 'game') {
						console.log(value.name)
						return value.name
					}
				})
				console.log(content)
				return {
					name: version.name,
					version: 'VE v12',
					isVersion: true,
				}
			})
			console.log(entries)

			setInstances(entries)
		})
	}, [])

	return (
		<>
			{instances.length ? (
				instances.map((el, idx) => (
					<Version
						name={el.name}
						version={el.version}
						isVersion={el.isVersion}
						key={idx}
					/>
				))
			) : (
				<Version name='Версий не найдено' version={'VE'} isVersion={false} />
			)}
		</>
	)
}

export default Versions
