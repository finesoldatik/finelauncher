import { useNavigate } from 'react-router-dom'

export default function Home() {
	const navigate = useNavigate()
	return (
		<div style={{ textAlign: 'center', margin: 'auto', marginTop: 100 }}>
			<h1>
				<p className='violet-text' style={{ display: 'inline-block' }}>
					Привет!
				</p>{' '}
				<p style={{ display: 'inline-block' }}>Давай</p>
			</h1>
			<h1>
				<p style={{ display: 'inline-block' }}>скорей начнем</p>{' '}
				<p className='violet-text' style={{ display: 'inline-block' }}>
					играть!
				</p>
			</h1>
			<div style={{marginTop: 30}}>
				<button
					className='default'
					style={{ backgroundColor: '#2d2dd2', width: 115, marginRight: 5 }}
					onClick={() => navigate('/versions')}
				>
					Версии
				</button>
				<button
					className='default'
					style={{ backgroundColor: '#34653A', width: 115 }}
					onClick={() => navigate('/versions')}
				>
					Играть
				</button>
			</div>
		</div>
	)
}
