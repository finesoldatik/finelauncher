import { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useSettingsContext } from '../../../../contexts/SettingsProvider'
import { Link } from 'react-router-dom'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import {
	discordPresence,
	reconnectDiscordRPC,
} from '../../../../utils/discordRPC'
import { LAUNCHER_NAME, LAUNCHER_VERSION } from '../../../../constants'

const Footer: FC = () => {
	console.log('Footer Render')

	const settingsContext = useSettingsContext()

	return (
		<div className='flex flex-row items-center mb-2'>
			<p className='text-1xl ml-2 mt-4'>
				{settingsContext.translation.translatable(
					'settingsPage.footer.thanksForUsing'
				)}{' '}
				{LAUNCHER_NAME}! <FontAwesomeIcon icon={faHeart} color='red' /> (
				{LAUNCHER_VERSION}){' '}
				<Link className='link link-primary' to='/about'>
					{settingsContext.translation.translatable(
						'settingsPage.footer.aboutUs'
					)}
				</Link>
			</p>
			<div className='flex flex-grow'></div>
			<button
				className='btn btn-accent btn-sm'
				onClick={() => {
					reconnectDiscordRPC().then(() => {
						discordPresence('Ковыряется в настройках')
					})
				}}
			>
				{settingsContext.translation.translatable(
					'settingsPage.footer.restartDiscordActivity'
				)}{' '}
				<FontAwesomeIcon icon={faDiscord} />
			</button>
			<button
				className='ml-1 btn btn-error btn-sm'
				onClick={() => {
					settingsContext.setTheme('dark')
					settingsContext.resetSettings()
				}}
			>
				{settingsContext.translation.translatable(
					'settingsPage.footer.resetSettings'
				)}
			</button>
		</div>
	)
}

export default Footer
