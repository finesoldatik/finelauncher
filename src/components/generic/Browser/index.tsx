import { ReactNode } from 'react'

export default function Browser({
	url,
	children,
	className,
}: {
	url: string
	children?: ReactNode
	className?: string
}) {
	return (
		<div className={`mockup-browser bg-base-300 border w-96 h-72 ${className}`}>
			<div className='mockup-browser-toolbar'>
				<div className='input'>{url}</div>
			</div>
			<div className='w-full h-full bg-base-200 flex justify-center px-4 py-16'>
				<h1 className='text-2xl font-bold'>{children}</h1>
			</div>
		</div>
	)
}
