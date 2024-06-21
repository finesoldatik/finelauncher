import { useNavigate } from 'react-router-dom'

export default function NotFound() {
	const navigate = useNavigate()

	return (
		<div className='flex flex-col items-center justify-center h-screen w-full'>
			<h1 className='text-2xl'>Упс.. Что-то пошло не так 😅</h1>
			<div className='flex flex-row gap-1 mt-2'>
				<button className='btn btn-warning' onClick={() => navigate(-1)}>
					Назад
				</button>
				<button className='btn btn-primary' onClick={() => navigate('/')}>
					На главную
				</button>
			</div>
		</div>
	)
}
