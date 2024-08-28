import Instance from '../Instance'
import NoInstances from '../NoInstances'
import {
	getInstalledInstances,
	getInstanceData,
} from '../../../../utils/instanceManager'
import { FC, useEffect, useState } from 'react'
import { IVersion } from '../../../../utils/version'
import LoadingInstances from '../LoadingInstances'
import Navbar from '../Navbar'

export interface IVersionDisplay {
	name: string
	version: IVersion
	image: string
}

export const loadInstances = async (
	setLoading: (value: boolean) => void,
	setInstances: (value: (IVersionDisplay | undefined)[]) => void
) => {
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

		setInstances(filtered)
		setLoading(false)
	})
}

const Instances: FC = () => {
	console.log('Instances Render')

	const [instances, setInstances] = useState<(IVersionDisplay | undefined)[]>(
		[]
	)
	const [isLoading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		loadInstances(setLoading, setInstances)
	}, [])

	return (
		<div>
			<Navbar loadInstances={() => loadInstances(setLoading, setInstances)} />
			{isLoading && <LoadingInstances />}
			{!isLoading && !instances.length && <NoInstances />}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-1 p-1'>
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
		</div>
	)
}

export default Instances
