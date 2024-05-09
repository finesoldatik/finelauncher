import { useState } from 'react'
import ReactSelect, { defaultTheme } from 'react-select'

const options = [
	{
		value: '1',
		label: '1',
	},
	{
		value: '2',
		label: '2',
	},
	{
		value: '3',
		label: '3',
	},
]

export default function Select() {
  const [currentVersion, setCurrentVersion] = useState("")
	return (
		<ReactSelect
			theme={theme => ({
				...theme,
				colors: {
					...theme.colors,
					text: 'blue',
					primary25: 'pink',
					primary: 'black',
				},
			})}
			options={options}
		/>
	)
}
