interface ThemeProps {
	name: string
	activeTheme: string
	setTheme: () => void
}

export default function Theme({ name, activeTheme, setTheme }: ThemeProps) {
	return (
		<div
			className={`md:w-60 lg:max-w-48 outline-base-content text-start outline outline-2 rounded-[--rounded-btn] outline-offset-4 ${
				activeTheme == name ? '!outline-base-content' : 'outline-transparent'
			}`}
			onClick={() => setTheme()}
		>
			<div
				className='bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans'
				data-theme={name}
			>
				<div className='flex flex-row justify-between items-center px-4 py-3'>
					<span className='flex-grow text-sm pr-5'>{name}</span>
					<div className='flex h-full shrink-0 flex-wrap gap-1'>
						<div className='bg-primary rounded-badge w-3 h-3'></div>
						<div className='bg-secondary rounded-badge w-3 h-3'></div>
						<div className='bg-accent rounded-badge w-3 h-3'></div>
						<div className='bg-neutral rounded-badge w-3 h-3'></div>
					</div>
				</div>
			</div>
		</div>
	)
}
