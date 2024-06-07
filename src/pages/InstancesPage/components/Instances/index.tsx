import Instance from '../Instance'
import NewInstance from '../NewInstance'
import NoInstances from '../NoInstances'
import {
	getInstalledInstances,
	getInstanceData,
} from '../../../../utils/instanceManager'
import { FC, useEffect, useState } from 'react'

interface IVersion {
	name: string
	version: string
	image: string
}

const Instances: FC = () => {
	console.log('Instances Render')

	const [instances, setInstances] = useState<IVersion[]>([])

	useEffect(() => {
		const getInstances = async () => {
			const installedInstances = await getInstalledInstances()
			Promise.all(
				installedInstances.map(async instance => {
					const instanceData = await getInstanceData(String(instance.name))
					return {
						name: String(instance.name),
						version: instanceData.gameVersion,
						image: instanceData.icon,
					}
				})
			).then(value => {
				console.log(value)
				setInstances(value)
			})
		}

		getInstances()
	}, [])

	return (
		<div className='flex flex-row'>
			<NewInstance />
			{instances.length ? (
				instances.map((el, idx) => (
					<Instance
						name={el.name}
						version={el.version}
						image={el.image}
						key={idx}
					/>
				))
			) : (
				<NoInstances />
			)}
		</div>
	)
}

export default Instances
