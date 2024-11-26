interface ToggleProps {
	title: string
	isOn: boolean
	onToggle: () => void
}

export default function Toggle({ title, isOn, onToggle }: ToggleProps) {
	return (
		<div className='form-control'>
			<label className='label cursor-pointer'>
				<span className='label-text'>{title}</span>
				<input
					type='checkbox'
					className='toggle toggle-primary'
					defaultChecked={isOn}
					onClick={onToggle}
				/>
			</label>
		</div>
	)
}
