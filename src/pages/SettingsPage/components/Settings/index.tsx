import { FC, useState } from 'react'
import LauncherTab from '../tabs/LauncherTab/index.tsx'
import GameTab from '../tabs/GameTab/index.tsx'
import Footer from '../Footer/index.tsx'

const Settings: FC = () => {
	console.log('Settings Render')

	const [currentTab, setCurrentTab] = useState<number>(0)

	return (
		<div className='flex-col flex h-full w-full overflow-y-scroll gap-2'>
			<div className='tabs tabs-lifted'>
				{/* Настройки Лаунчера */}
				<LauncherTab currentTab={currentTab} setCurrentTab={setCurrentTab} />

				{/* Настройки Игры */}
				<GameTab currentTab={currentTab} setCurrentTab={setCurrentTab} />
			</div>

			<div className='flex flex-grow'></div>

			<Footer />
		</div>
	)
}

export default Settings
