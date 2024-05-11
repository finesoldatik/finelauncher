import { useParams } from 'react-router-dom'
import api from '../api.ts'

export default function Version() {
	const params = useParams()

	let image

	// if (params.version.split(' ')[0] === 'VE') image = '/images/ve-512.png'
	// else if (params.version.split(' ')[0] === 'RVE') image = '/images/rve-512.png'

	console.log('VE' in params.version.split(' '))
	console.log(params)

	if ('VE' in params.version.split(' ')) image = '/images/ve-512.png'
	else if ('RVE' in params.version.split(' ')) image = '/images/rve-512.png'


	return (
		<div
			className='default'
			style={{
				backgroundColor: '#111',
				width: 300,
				cursor: 'default',
				margin: 'auto',
			}}
		>
			<img
				src={image}
				width={160}
				height={160}
				alt='image'
				style={{ padding: 10, textAlign: 'center' }}
			/>
			<h3>Имя версии: {params.name}</h3>
			<div style={{ marginTop: 20, textAlign: 'center' }}>
				<button
					className='default'
					style={{ width: 170, marginRight: 10 }}
					onClick={() => api.openDirOfVersion(params.name)}
				>
					Открыть папку
				</button>
				<button
					className='default'
					style={{ backgroundColor: '#34653A', width: 115 }}
					onClick={() => api.runVersion(params.name)}
				>
					Играть
				</button>
			</div>
		</div>
	)
}
