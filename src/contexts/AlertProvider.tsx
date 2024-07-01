import { createContext, useContext, ReactNode, useMemo, useState } from 'react'

interface IAlertContext {
	alerts: IAlert[]
	addAlert: (value: IAlert) => void
	removeAlert: (value: number) => void
	deleteAlerts: () => void
}

export const AlertContext = createContext<IAlertContext>({
	alerts: [],
	addAlert: () => {},
	removeAlert: () => {},
	deleteAlerts: () => {},
})

export const useAlertContext = () => useContext(AlertContext)

interface IAlert {
	id?: number
	active: boolean
	title: string
	description: string
}

export default function AlertProvider({ children }: { children: ReactNode }) {
	console.log('AlertProvider Render')

	const [alerts, setAlerts] = useState<IAlert[]>([])

	const addAlert = (alert: IAlert) => {
		const id = Math.floor(Math.random() * (999999 - 0 + 1) + 0)
		setAlerts(prev => [...prev, { ...alert, id }])

		setTimeout(
			() =>
				setAlerts(prev => {
					console.log(prev)
					const thisAlert = prev.filter(value => value.id === id)[0]
					thisAlert.active = !thisAlert.active
					console.log(thisAlert)
					return [...prev, thisAlert]
				}),
			3000
		)
		return alert
	}

	const removeAlert = (alertId: number) => {
		setAlerts(prev => prev.filter(alert => alert.id !== alertId))
		return alertId
	}

	const deleteAlerts = () => {
		setAlerts([])
		return []
	}

	const value = useMemo(
		() => ({
			alerts,
			addAlert,
			removeAlert,
			deleteAlerts,
		}),
		[alerts]
	)

	return <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
}
