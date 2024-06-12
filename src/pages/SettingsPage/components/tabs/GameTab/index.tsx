import { FC } from 'react'
import Tab from '../../Tab'
import { ITabProps } from '../tab.types'

const GameTab: FC<ITabProps> = ({ currentTab, setCurrentTab }) => {
	console.log('GameTab Render')

	return (
		<Tab
			title='Игра'
			id={1}
			currentTab={currentTab}
			setCurrentTab={setCurrentTab}
		>
			<h1>Пока-что опций нет</h1>
		</Tab>
	)
}

export default GameTab
