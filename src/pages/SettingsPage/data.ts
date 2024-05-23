interface ITable {
	title: string
	items: string[]
}

type Tables = ITable[]

const tables: Tables = [
	{
		title: 'Внесли большой вклад',
		items: [
			'@finesoldatik',
			'@rafalesr',
			'@kotisoff',
			'@booleanfalse',
			'@callfishtwink',
			'@wampal',
		],
	},
	{
		title: 'Используемые продукты',
		items: ['voxelworld.ru', 'icons8.ru'],
	},
	{
		title: 'Разработчики',
		items: ['@finesoldatik', '@kotisoff'],
	},
]

export default tables
