import { useState, useEffect, useRef } from 'react'
import api from '../api.ts'

export default function Version() {
	const progressBarRef = useRef(null)

	const [installed, setInstalled] = useState(false)

	useEffect(() => {
		const a = async () => {
			const result = await api.checkVersion('v18')
			setInstalled(result)
		}
		a()

		const b = async () => {
			const unSubscribe = await api.getProgress(progressBarRef)
			await unSubscribe()
		}
		b()
	}, [])

	return (
		<div>
			<h1>Version</h1>
			{installed ? (
				<>
					<button className='default' onClick={() => api.runVersion('v18')}>
						Редактировать
					</button>
					<button className='default' onClick={() => api.runVersion('v18')}>
						Играть
					</button>
				</>
			) : (
				<>
					<p ref={progressBarRef}>Прогресс Бар</p>
					<button
						className='btn'
						onClick={() =>
							api.installVersion(
								'https://github.com/MihailRis/VoxelEngine-Cpp/releases/download/v18/voxelengine_v18_win64.zip',
								'v18'
							)
						}
					>
						Установить
					</button>
				</>
			)}
		</div>
	)
}
