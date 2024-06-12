import { FC } from 'react'

export interface IOption {
	label: string
	value: string
}

interface ISelectProps {
	title: string
	options: IOption[]
	setChangedValue: (value: IOption) => void
	disabled: boolean
	styles?: string
}

const Select: FC<ISelectProps> = ({
	title,
	options,
	setChangedValue,
	disabled,
	styles,
}) => {
	console.log('Select Render')
	
	return (
		<select
			className={`select select-primary w-full ${styles}`}
			title='select'
			disabled={disabled}
			onChange={event => {
				const option = options.find(
					option => option.value === event.target.value
				)
				setChangedValue({
					label: String(option?.label),
					value: String(option?.value),
				})
			}}
			defaultValue=''
		>
			<option value='' disabled>
				{title}
			</option>
			{options.map(option => (
				<option value={option.value} key={option.value}>
					{option.label}
				</option>
			))}
		</select>
	)
}

export default Select
