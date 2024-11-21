import { useNavigate, useParams } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { useEffect } from 'react'
import { discordPresence } from '../../services/discordRPC'
import InstancesMenu from '../../components/InstancesMenu'
import veBg from '../../assets/images/ve/bg.png'
import veIcon from '../../assets/images/ve/ve.png'

export default function Instances() {
	console.log('InstancesPage Render')

	const navigate = useNavigate()
	const settingsContext = useSettingsContext()

	const { name } = useParams<{ name: string | undefined }>()

	useEffect(() => {
		discordPresence('Смотрит новости 👀')
	}, [])

	useEffect(() => {
		navigate(settingsContext.currentPage)
	}, [settingsContext.currentPage])

	console.log('name', name)

	return (
		<div className='flex flex-row'>
			<InstancesMenu
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
				<>
					<div
						className='flex relative bg-cover bg-no-repeat bg-center w-full h-36'
						style={{ backgroundImage: `url(${veBg})` }}
					>
						<div className='bg-black bg-opacity-30 h-full w-full'></div>
						<div className='flex flex-row absolute top-16 w-full'>
							<img
								className='ml-1 w-[20%] h-[20%] max-w-48 max-h-48 mt-16 transition-all duration-200'
								src={veIcon}
								alt='icon'
							/>
							<div className='flex flex-col flex-nowrap ml-2 pt-[86px] text-xl w-[60%] transition-all duration-500'>
								<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
									ААААААААААААААААААААААААААААААААА{name}
								</h1>
								<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
									v0.20.3
								</h1>
							</div>
						</div>
					</div>
				</>
			</div>
		</div>
	)
}
