import { useNavigate, useParams } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect, useState } from 'react'
import * as DiscordRPC from '../../services/discordRPC'
import InstancesMenu from '../../components/InstancesMenu'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Instance from '../../components/Instance'
import Main from '../../components/Main'

export default function Instances() {
	console.log('InstancesPage Render')

	const navigate = useNavigate()
	const settingsContext = useSettingsContext()

	const { name } = useParams<{ name: string | undefined }>()

	useEffect(() => {
		if (name)
			DiscordRPC.isConnected().then(val => {
				if (val)
					DiscordRPC.update(
						settingsContext.translation.translatable('Разглядывает сборку 👀')
					)
			})
	}, [name])

	useEffect(() => {
		navigate(settingsContext.currentPage)
	}, [settingsContext.currentPage])

	console.log('name', name)

	return (
		<div className='flex flex-row'>
			<InstancesMenu
				name={String(name)}
				instances={[
					{ name: 'Моя сборка', version: 'v0.20.3' },
					{ name: 'Сборка №2', version: 'v0.20.3' },
					{
						name: 'названия в 33 символа максимум',
						version: 'v0.20.3',
					},
					{ name: 'Сборка №233333', version: 'v0.20.3' },
				]}
			/>

			<div className='w-full h-screen bg-base-300'>
				<TransitionGroup>
					<CSSTransition
						key={name}
						timeout={500}
						classNames='page-down'
						unmountOnExit
					>
						{name ? <Instance name={name} /> : <Main />}
					</CSSTransition>
				</TransitionGroup>
			</div>
		</div>
	)
}
