import { useNavigate } from 'react-router-dom'

export default function Home() {
	const navigate = useNavigate()
	return (
		<>
			<h1></h1>
			<button className='default' onClick={() => navigate('/versions')}>
				Versions
			</button>
			<button className='default' onClick={() => navigate('/versions')}>
				Play
			</button>
		</>
	)
}
