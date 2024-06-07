import { useParams } from 'react-router-dom'

export default function InstancePage() {
	console.log('InstancePage Render')

	const params = useParams<{ name: string }>()

	return <h1>Instance {params.name}</h1>
}
