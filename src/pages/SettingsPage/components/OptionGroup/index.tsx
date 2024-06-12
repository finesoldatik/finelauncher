import { FC, ReactNode } from 'react'

interface IOptionGroupProps {
	defaultChecked?: boolean
	title: string
	children: ReactNode
	styles?: string
}

const OptionGroup: FC<IOptionGroupProps> = ({
	title,
	defaultChecked,
	children,
	styles,
}) => {
	console.log('OptionGroup Render')

	return (
		<div className={`collapse bg-base-200 ${styles}`}>
			<input type='checkbox' title='checkbox' defaultChecked={defaultChecked} />
			<div className='collapse-title text-xl font-medium'>{title}</div>
			<div className='collapse-content'>{children}</div>
		</div>
	)
}

export default OptionGroup
