import { FC } from 'react'

interface IOptionProps {
	title: string
	value: boolean
	setOption: (value: boolean) => void
}

const Option: FC<IOptionProps> = ({ title, value, setOption }) => {
	return (
		<div className='form-control'>
			<label className='label cursor-pointer'>
				<span className='label-text'>{title}</span>
				<input
					type='checkbox'
					defaultChecked={value}
					className='checkbox checkbox-primary'
					onChange={() => setOption(!value)}
				/>
			</label>
		</div>
	)
}

export default Option
