import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ContributorsWrapper, { IContributor } from '../../utils/contributors'

export default function AboutPage() {
	const [contributors, setContributors] = useState<IContributor[]>([])

	useEffect(() => {
		const contributorsWrapper = new ContributorsWrapper()
		contributorsWrapper.getContributors().then(value => {
			console.log(value)
			setContributors(value)
		})
	}, [])

	return (
		<>
			<h1 className='flex justify-center text-5xl my-2'>О нас</h1>

			<div className='flex flex-row mt-1 ml-2'>
				<p className='text-lg mr-2'>Загляните к нам в</p>
				<ul className='mt-1'>
					<li>
						<Link
							className='link link-primary'
							to='https://github.com/finesoldatik/finelauncher'
							target='_blank'
						>
							<FontAwesomeIcon className='mr-1' icon={faGithub} />
							Github
						</Link>
					</li>
					<li>
						<Link
							className='link link-primary'
							to='https://discord.com/invite/KU4dXuWBVv'
							target='_blank'
						>
							<FontAwesomeIcon icon={faDiscord} />
							Discord
						</Link>
					</li>
					<li>
						<Link
							className='link link-primary'
							to='https://github.com/finesoldatik/finelauncher/wiki'
							target='_blank'
						>
							<FontAwesomeIcon className='mr-1' icon={faCircleQuestion} />
							Wiki
						</Link>
					</li>
				</ul>
			</div>
			<h2 className='text-lg ml-2'>
				Сейчас используется 2 версия дизайна (полностью переработанная).{' '}
				<Link
					className='link link-primary'
					to='https://discord.com/invite/KU4dXuWBVv'
					target='_blank'
				>
					Подробнее в нашем Discord.
				</Link>
			</h2>
			<div className='ml-2 mt-1'>
				<p>
					finelauncher использует API{' '}
					<Link
						className='link link-primary'
						to='https://voxelworld.ru/'
						target='_blank'
					>
						VoxelWorld'a
					</Link>
				</p>
			</div>
			<div className='divider'></div>
			<h2 className='text-lg ml-2'>Контрибьютеры</h2>
			<ul className='list-none'>
				{contributors.map(contributor => (
					<li className='flex flex-row ml-3 mt-3 mb-4' key={contributor.id}>
						<div className='avatar'>
							<div className='h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
								<img src={contributor.avatar_url} alt='contributor avatar' />
							</div>
						</div>
						<p className='ml-2 mt-1'>{contributor.login}</p>
					</li>
				))}
			</ul>
		</>
	)
}
