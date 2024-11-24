import { useState, useRef, ReactElement } from 'react'

interface ResizerProps {
	element1MinWidthAsPercentage?: number
	element2MinWidthAsPercentage?: number
	element1WidthAsPercentage?: number
	element2WidthAsPercentage?: number
	dividerWidthWInPixels?: number
	dividerBgColor?: string
	position?: 'horizontal' | 'vertical'
	element1: ReactElement
	element2: ReactElement
}

export default function Resizer({
	element1MinWidthAsPercentage = 10,
	element2MinWidthAsPercentage = 10,
	element1WidthAsPercentage = 50,
	element2WidthAsPercentage = 50,
	dividerWidthWInPixels = 8,
	dividerBgColor = '#606060',
	position = 'horizontal',
	element1,
	element2,
}: ResizerProps) {
	const [element1Width, setElement1Width] = useState<number>(
		element1WidthAsPercentage
	) // ширина 1 элемента в процентах
	const [element2Width, setElement2Width] = useState<number>(
		element2WidthAsPercentage
	) // ширина 2 элемента в процентах

	const [element1Height, setElement1Height] = useState<number>(
		element1WidthAsPercentage
	) // высота 1 элемента в процентах
	const [element2Height, setElement2Height] = useState<number>(
		element2WidthAsPercentage
	) // высота 2 элемента в процентах

	const resizeAreaRef = useRef<HTMLDivElement | null>(null)
	const dividerWidth = dividerWidthWInPixels // Ширина разделителя

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()

		if (!resizeAreaRef.current) return

		let mouseMoveHandler: (event: MouseEvent) => void = () => {}

		if (position == 'horizontal') {
			const areaWidth = resizeAreaRef.current.offsetWidth

			const startX = e.clientX

			mouseMoveHandler = (event: MouseEvent) => {
				const deltaX = event.clientX - startX

				// Вычисляем новые размеры элементов
				const newElement1Width =
					(((element1Width * areaWidth) / 100 + deltaX) / areaWidth) * 100
				const newElement2Width = 100 - newElement1Width

				// Ограничиваем минимальные размеры
				if (
					newElement1Width >= element1MinWidthAsPercentage &&
					newElement2Width >= element2MinWidthAsPercentage
				) {
					setElement1Width(newElement1Width)
					setElement2Width(newElement2Width)
				}
			}
		} else {
			const areaHeight = resizeAreaRef.current.offsetHeight

			const startY = e.clientY

			mouseMoveHandler = (event: MouseEvent) => {
				const deltaY = event.clientY - startY

				// Вычисляем новые размеры элементов
				const newElement1Height =
					(((element1Height * areaHeight) / 100 + deltaY) / areaHeight) * 100
				const newElement2Height = 100 - newElement1Height

				// Ограничиваем минимальные размеры
				if (
					newElement1Height >= element1MinWidthAsPercentage &&
					newElement2Height >= element2MinWidthAsPercentage
				) {
					setElement1Height(newElement1Height)
					setElement2Height(newElement2Height)
				}
			}
		}

		const mouseUpHandler = () => {
			window.removeEventListener('mousemove', mouseMoveHandler)
			window.removeEventListener('mouseup', mouseUpHandler)
		}

		window.addEventListener('mousemove', mouseMoveHandler)
		window.addEventListener('mouseup', mouseUpHandler)
	}

	return (
		<div
			ref={resizeAreaRef}
			className={`flex ${
				position == 'horizontal' ? 'flex-row' : 'flex-col'
			} relative w-full h-full overflow-hidden`}
		>
			{position == 'horizontal' ? (
				<>
					<div style={{ width: `${element1Width}%` }}>{element1}</div>
					<div className='relative' onMouseDown={handleMouseDown}>
						<div className='absolute left-0 w-3 h-full cursor-ew-resize z-50'></div>
						<div
							className={`cursor-ew-resize z-50 bg-[${dividerBgColor}]`}
							style={{
								width: `${dividerWidth}px`,
								marginLeft: `-${dividerWidth / 2}px`, // Центрируем визуально
							}}
						/>
						<div className='absolute right-0 w-3 h-full cursor-ew-resize z-50'></div>
					</div>
					<div style={{ width: `${element2Width}%` }}>{element2}</div>
				</>
			) : (
				<>
					<div style={{ height: `${element1Height}%` }}>{element1}</div>
					<div className='relative' onMouseDown={handleMouseDown}>
						<div className='absolute top-0 h-3 w-full cursor-ns-resize z-50'></div>
						<div
							className={`cursor-ns-resize z-50 bg-[${dividerBgColor}]`}
							style={{
								height: `${dividerWidth}px`,
								marginTop: `-${dividerWidth / 2}px`, // Центрируем визуально
							}}
						/>
						<div className='absolute bottom-0 h-3 w-full cursor-ns-resize z-50'></div>
					</div>
					<div style={{ height: `${element2Height}%` }}>a{element2}</div>
				</>
			)}
		</div>
	)
}
