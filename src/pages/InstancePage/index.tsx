import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { InstanceData, getInstanceData } from '../../utils/instanceManager'
import { listen } from '@tauri-apps/api/event'
import { useGameContext } from '../../contexts/GameProvider'
import TitleContent from './components/TitleContent'
import PlayPanel from './components/PlayPanel'
import MainContent from './components/MainContent'

export default function InstancePage() {
	console.log('InstancePage Render')

	const params = useParams<{ name: string }>()

	const [data, setData] = useState<InstanceData>()

	const gameContext = useGameContext()

	useEffect(() => {
		getInstanceData(String(params.name)).then(value => {
			setData(value)
		})
	}, [])

	// позже это вынести надо в компонент с консолью
	useEffect(() => {
		const unSubscribeLog = listen('log_message', event => {
			console.log('Событие log_message:', event.payload)
			gameContext.addGameLogs(String(event.payload))
		})

		return () => {
			unSubscribeLog.then(unsub => unsub())
		}
	}, [])

	return (
		<div className='h-full'>
			<TitleContent
				icon={String(data?.icon)}
				name={String(params.name)}
				versionName={String(data?.version.name)}
			/>
			<MainContent name={String(params.name)} />
			<PlayPanel name={String(params.name)} />
		</div>
	)
}
