import { useNavigate, useParams } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect, useRef } from 'react'
import * as DiscordRPC from '../../services/discordRPC'
import InstancesMenu from '../../components/InstancesMenu'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Instance from '../../components/Instance'
import Main from '../../components/Main'
import Resizer from '../../components/generic/Resizer'

export default function Instances() {
	console.log('InstancesPage Render')

	const navigate = useNavigate()
	const { state } = useSettingsContext()

	const instanceRef = useRef(null)

	const { name } = useParams<{ name: string | undefined }>()

	useEffect(() => {
		if (name)
			DiscordRPC.isConnected().then(val => {
				if (val)
					DiscordRPC.update(
						state.translation.translatable(
							'instancesPage.DiscordRPC.Instance'
						)
					)
			})
	}, [name])

	useEffect(() => {
		if (state.currentPage) navigate(state.currentPage)
	}, [state.currentPage])

	console.log('name', name)

	return (
		<>
			<Resizer
				element1MinWidthAsPercentage={22}
				element2MinWidthAsPercentage={68}
				element1WidthAsPercentage={22}
				element2WidthAsPercentage={78}
				position='horizontal'
				element1={
					<InstancesMenu
						name={String(name)}
						instances={[
							{ name: 'Моя сборка', version: 'v0.20.3' },
							{ name: 'Сборка №2', version: 'v0.20.3' },
							{
								name: 'названия в 33 символа максимум123',
								version: 'v0.20.3',
							},
							{ name: 'Сборка №233333', version: 'v0.20.3' },
						]}
					/>
				}
				element2={
					<div className='w-full h-screen bg-base-300'>
						<TransitionGroup>
							<CSSTransition
								key={name}
								timeout={200}
								classNames='instance-down'
								appear
								nodeRef={instanceRef}
							>
								<div ref={instanceRef}>
									{name ? <Instance name={name} /> : <Main />}
								</div>
							</CSSTransition>
						</TransitionGroup>
					</div>
				}
			/>
		</>
	)
}
