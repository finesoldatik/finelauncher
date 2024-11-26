import { Link } from 'react-router-dom'

interface InstanceMenuItemProps {
	name: string
	version: string
	activeInstance: string
	setActiveInstance: () => void
}

export default function InstanceMenuItem({
	name,
	version,
	activeInstance,
	setActiveInstance,
}: InstanceMenuItemProps) {
	return (
		<li className={`rounded-lg ${activeInstance == name ? 'bg-base-300' : ''}`}>
			<Link to={`/instances/${name}`} onClick={() => setActiveInstance()}>
				<div className='whitespace-nowrap overflow-hidden text-ellipsis'>
					{name}
				</div>
				<div className='badge bg-transparent border-transparent italic'>
					{version}
				</div>
			</Link>
		</li>
	)
}
