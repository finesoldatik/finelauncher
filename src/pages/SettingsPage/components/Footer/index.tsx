import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'

const Footer: FC = () => {
  const settingsContext = useSettingsContext()

	return (
		<div className='flex flex-row items-center'>
			<p className='text-1xl ml-2'>
				Спасибо за использование finelauncher!{' '}
				<FontAwesomeIcon icon={faHeart} color='red' />
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
