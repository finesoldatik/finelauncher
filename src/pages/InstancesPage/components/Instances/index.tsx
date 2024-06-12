import Instance from '../Instance'
import NewInstance from '../NewInstance'
import NoInstances from '../NoInstances'
import {
	getInstalledInstances,
	getInstanceData,
} from '../../../../utils/instanceManager'
import { FC, useEffect, useState } from 'react'
import { IVersion } from '../../../../utils/version'
import LoadingInstances from '../LoadingInstances'

interface IVersionDisplay {
	name: string
	version: IVersion
	image: string
}

const Instances: FC = () => {
	console.log('Instances Render')

	const [instances, setInstances] = useState<IVersionDisplay[] | undefined[]>(
		[]
	)
	const [isLoading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		const getInstances = async () => {
			setLoading(true)
			const installedInstances = await getInstalledInstances()
			Promise.all(
				installedInstances.map(async instance => {
					if (
						instance.children?.find(value => {
							return value.name === 'instance.json'
						}) &&
						instance.name
					) {
						const instanceData = await getInstanceData(String(instance.name))
						return {
							name: instanceData.name,
							version: instanceData.version,
							image: instanceData.icon,
						}
					}
				})
			).then(value => {
				const filtered = value.filter(val => val !== undefined)
				console.log(filtered)
				//@ts-expect-error все работает, но всеравно на что-то ругается
				setInstances(filtered)
				setLoading(false)
			})
		}

		getInstances()
	}, [])

	return (
		<div className='flex flex-row flex-wrap'>
			<NewInstance />
			{isLoading && <LoadingInstances />}
			{!isLoading && !instances.length && <NoInstances />}
			{!isLoading && instances.length ? (
				instances.map((el, idx) => (
					<Instance
						name={String(el?.name)}
						version={String(el?.version.name)}
						image={String(el?.image)}
						key={idx}
					/>
				))
			) : (
				<></>
			)}
		</div>
	)
}

export default Instances
