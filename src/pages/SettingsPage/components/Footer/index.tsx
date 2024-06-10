import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'
import { Link } from 'react-router-dom'

const Footer: FC = () => {
	const settingsContext = useSettingsContext()

	return (
		<div className='flex flex-row items-center mb-2'>
			<p className='text-1xl ml-2 mt-4'>
				Спасибо за использование finelauncher!{' '}
				<FontAwesomeIcon icon={faHeart} color='red' />{' '}
				<Link className='link link-primary' to='/about'>
					О нас
				</Link>
			</p>
			<div className='flex flex-grow'></div>
			<button
				className='btn btn-error btn-sm'
				onClick={() => {
					settingsContext.setTheme('dark')
					settingsContext.resetSettings()
				}}
			>
				Сбросить настройки
			</button>
		</div>
	)
}

export default Footer
