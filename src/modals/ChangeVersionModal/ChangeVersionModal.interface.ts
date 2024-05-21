type setActive = (value: boolean) => void

interface IMod {
	id: number
	downloadUrl: string
}

export interface IChangeVersionProps {
	active: boolean
	mod: IMod
	setActive: setActive
}
