import { ReactNode } from 'react'

export default function Window({
	children,
	className,
}: {
	children?: ReactNode
	className?: string
}) {
	return (
		<div className={`mockup-window bg-base-300 border w-96 h-72 ${className}`}>
			<div className='w-full h-full bg-base-200 flex justify-center px-4 py-16'>
				{children}
			</div>
		</div>
	)
}
