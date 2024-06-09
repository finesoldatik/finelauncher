import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

export default function AboutPage() {
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
		</>
	)
}
