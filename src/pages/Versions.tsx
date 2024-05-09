import NewVersion from '../components/newVersion/NewVersion'
import Version from '../components/version/Version'

const versions = [
	{
		title: '1114',
		version: 'VoxelEngine v12',
	},
	{
		title: '2223',
		version: 'VoxelEngine v13',
	},
	{
		title: '2222',
		version: 'VoxelEngine v14',
	},
	{
		title: '2221',
		version: 'VoxelEngine v17',
	},
	{
		title: '1114',
		version: 'VoxelEngine v12',
	},
	{
		title: '2223',
		version: 'VoxelEngine v13',
	},
	{
		title: '2222',
		version: 'VoxelEngine v14',
	},
	{
		title: '2221',
		version: 'VoxelEngine v17',
	},
]

export default function Versions() {
	return (
		<>
			<div className='versions'>
				<NewVersion />
				{versions.map((el, idx) => Version(el.title, el.version, idx))}
			</div>
		</>
	)
}
