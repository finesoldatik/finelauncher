import { Link } from 'react-router-dom'

interface InstanceMenuItemProps {
	name: string
	version: string
}

export default function InstanceMenuItem({
	name,
	version,
}: InstanceMenuItemProps) {
	return (
		<li>
			<Link to={`/instances/${name}`}>
				<div className='whitespace-nowrap overflow-hidden text-ellipsis'>
					{name}
				</div>
				<div className='badge badge-primary badge-outline'>{version}</div>
			</Link>
		</li>
	)
}
