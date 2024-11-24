import { Link } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import InstanceMenuItem from '../InstanceMenuItem'
import { useEffect, useState } from 'react'

export interface Instance {
	name: string
	version: string
}

interface InstancesMenuProps {
	name: string
	instances: Instance[]
}

export default function InstancesMenu({ name, instances }: InstancesMenuProps) {
	const settingsContext = useSettingsContext()

	const [activeInstance, setActiveInstance] = useState(name)

	useEffect(() => {
		setActiveInstance(name)
	}, [name])

	return (
		<ul
			className='menu menu-md bg-base-200
    flex flex-col flex-nowrap w-full h-screen
    overflow-y-auto overflow-x-hidden'
		>
			<li>
				<Link
					className='btn btn-ghost'
					to={'/new-instance'}
					onClick={() => settingsContext.setPage('/new-instance')}
				>
					Создать сборку
				</Link>
			</li>
			{instances.map((instance, idx) => (
				<InstanceMenuItem
					name={instance.name}
					version={instance.version}
					activeInstance={String(activeInstance)}
					setActiveInstance={setActiveInstance}
					key={idx}
				/>
			))}
		</ul>
	)
}
