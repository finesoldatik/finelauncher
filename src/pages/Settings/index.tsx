import Theme from '../../components/Theme'
import { themes } from '../../constants'

export default function Settings() {
	return (
		<>
			<div className='flex flex-row flex-wrap gap-3 bg-base-300 p-10'>
				{themes.map(val => (
					<Theme name={val} key={val} />
				))}
			</div>
		</>
	)
}
