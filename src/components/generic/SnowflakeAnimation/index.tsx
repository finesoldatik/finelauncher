import React, { useEffect, useRef } from 'react'

function SnowflakeAnimation({
	snowflakeCount = 300,
}: {
	snowflakeCount?: number
}) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const snowflakes = useRef(
		Array.from({ length: snowflakeCount }, () => ({
			x: Math.random() * window.innerWidth, // Начальная позиция X
			y: Math.random() * window.innerHeight, // Начальная позиция Y
			size: Math.random() * 3 + 1, // Размер снежинки
			speed: Math.random() * 1 + 0.5, // Скорость падения
			amplitude: Math.random() * 2, // Амплитуда колебаний
			phase: Math.random() * Math.PI * 2, // Фаза для синусоидального движения
		}))
	)

	useEffect(() => {
		const canvas = canvasRef.current
		const ctx = canvas?.getContext('2d')
		if (!canvas || !ctx) return

		canvas.width = window.innerWidth
		canvas.height = window.innerHeight

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			snowflakes.current.forEach(flake => {
				flake.y += flake.speed
				flake.x += Math.sin(flake.phase) * flake.amplitude
				flake.phase += 0.01

				// Если снежинка выходит за пределы экрана, возвращаем её наверх
				if (flake.y > canvas.height) {
					flake.y = -flake.size
					flake.x = Math.random() * canvas.width
				}

				ctx.beginPath()
				ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2)
				ctx.fillStyle = 'white'
				ctx.fill()
			})

			requestAnimationFrame(animate)
		}

		animate()

		// Обновляем размеры канваса при изменении размеров окна
		const handleResize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<canvas
			ref={canvasRef}
			className='absolute top-0 left-0 w-full h-full pointer-events-none z-[9999]'
		/>
	)
}

export default React.memo(SnowflakeAnimation)
