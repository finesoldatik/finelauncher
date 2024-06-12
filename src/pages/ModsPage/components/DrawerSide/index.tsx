import { FC, SetStateAction, memo } from 'react'
import { ITag } from '../../ModsPage.types'
import { IParams } from '../Mods'

interface IDrawerSideProps {
	tags: ITag[]
	setParams: (value: SetStateAction<IParams>) => void
}

const sorts = [
	{
		id: 1,
		label: 'По популярности',
	},
	{
		id: 2,
		label: 'По лайкам',
	},
	{
		id: 3,
		label: 'По дате добавления',
	},
]

const DrawerSide: FC<IDrawerSideProps> = memo(({ tags, setParams }) => {
	console.log('DrawerSide Render')

	return (
		<div className='drawer-side'>
			<label
				htmlFor='my-drawer-4'
				aria-label='close sidebar'
				className='drawer-overlay'
			></label>
			<div className='menu p-4 w-80 min-h-full bg-base-200 text-base-content'>
				{/* Sidebar content here */}
				<h1 className='text-2xl'>Фильтры</h1>
				<div className='divider divider-primary'></div>
				<div>
					<div>
						<h2 className='text-lg'>Сортировка</h2>
						{sorts.map(sort => (
							<div className='form-control' key={sort.id}>
								<label className='label cursor-pointer'>
									<span className='label-text'>{sort.label}</span>
									<input
										type='radio'
										name='radio-2'
										value={sort.id}
										defaultChecked={sort.id === 1}
										className='radio radio-primary'
										onChange={event =>
											setParams(prev => ({
												...prev,
												page: 1,
												sort: Number(event.target.value),
											}))
										}
									/>
								</label>
							</div>
						))}
					</div>
					<div className='divider'></div>
					<div>
						<h2 className='text-lg'>Теги</h2>
						{tags.map(tag => (
							<div className='form-control' key={tag.id}>
								<label className='label cursor-pointer'>
									<span className='label-text'>{tag.title}</span>
									<input
										type='checkbox'
										className='checkbox checkbox-primary'
										onChange={event => {
											console.log('start')
											console.log('tag.id', tag.id)
											if (event.target.checked)
												setParams(prev => {
													prev.tags.push(tag.id)
													console.log(prev.tags)

													return {
														...prev,
														page: 1,
														tags: prev.tags,
													}
												})
											else
												setParams(prev => {
													prev.tags.splice(prev.tags.indexOf(tag.id))
													console.log(prev.tags)

													return {
														...prev,
														page: 1,
														tags: prev.tags,
													}
												})
										}}
									/>
								</label>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
})

export default DrawerSide
