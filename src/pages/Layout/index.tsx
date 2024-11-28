import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Sidebar from '../../components/generic/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { bottomItems } from '../../components/generic/Sidebar/items'
import { useMemo, useRef } from 'react'
import SnowflakeAnimation from '../../components/generic/SnowflakeAnimation'

const handleContextMenu = (_event: any) => {} //event.preventDefault()

export default function Layout() {
	const { state } = useSettingsContext()

	const pageTopRef = useRef(null)
	const pageDownRef = useRef(null)

	const isBottom = useMemo(
		() => bottomItems.map(val => val.link).includes(state.currentPage),
		[state.currentPage]
	)

	return (
		<>
			{state.fallingSnowflakes && (
				<SnowflakeAnimation snowflakeCount={state.snowflakeCount} />
			)}
			<div className='window' onContextMenu={handleContextMenu}>
				<Sidebar />

				<main>
					<TransitionGroup>
						{isBottom ? (
							<CSSTransition
								key={state.currentPage}
								timeout={300}
								classNames='page-down'
								appear
								nodeRef={pageDownRef}
							>
								<div ref={pageDownRef} className='overflow-y-auto'>
									<Outlet />
								</div>
							</CSSTransition>
						) : (
							<CSSTransition
								key={state.currentPage}
								timeout={300}
								classNames='page-top'
								appear
								nodeRef={pageTopRef}
							>
								<div ref={pageTopRef} className='overflow-y-auto'>
									<Outlet />
								</div>
							</CSSTransition>
						)}
					</TransitionGroup>
				</main>
			</div>
		</>
	)
}
