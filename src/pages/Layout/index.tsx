import { CSSTransition, TransitionGroup } from 'react-transition-group'
import Sidebar from '../../components/generic/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSettingsContext } from '../../contexts/SettingsProvider'
import { bottomItems, topItems } from '../../components/generic/Sidebar/items'
import { useMemo, useRef } from 'react'
import SnowflakeAnimation from '../../components/generic/SnowflakeAnimation'

const handleContextMenu = (_event: any) => {} //event.preventDefault()

export default function Layout() {
	const { state } = useSettingsContext()

	const topPageRef = useRef(null)
	const bottomPageRef = useRef(null)
	const anotherPageRef = useRef(null)

	const isTop = useMemo(
		() => topItems.map(val => val.id).includes(state.currentTab),
		[state.currentTab]
	)

	const isBottom = useMemo(
		() => bottomItems.map(val => val.id).includes(state.currentTab),
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
						{isTop && (
							<CSSTransition
								key={state.currentPage}
								timeout={300}
								classNames='page-top'
								appear
								nodeRef={topPageRef}
							>
								<div ref={topPageRef} className='overflow-y-auto'>
									<Outlet />
								</div>
							</CSSTransition>
						)}

						{isBottom && (
							<CSSTransition
								key={state.currentPage}
								timeout={300}
								classNames='page-down'
								appear
								nodeRef={bottomPageRef}
							>
								<div ref={bottomPageRef} className='overflow-y-auto'>
									<Outlet />
								</div>
							</CSSTransition>
						)}

						{!isTop && !isBottom ? (
							<CSSTransition
								key={state.currentPage}
								timeout={300}
								classNames='page-down'
								appear
								nodeRef={anotherPageRef}
							>
								<div ref={anotherPageRef} className='overflow-y-auto'>
									<Outlet />
								</div>
							</CSSTransition>
						) : null}
					</TransitionGroup>
				</main>
			</div>
		</>
	)
}
