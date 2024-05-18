type setActive = React.Dispatch<React.SetStateAction<boolean>>

interface IMod {
	id: number
	downloadUrl: string
}

export interface ChangeVersionProps {
	active: boolean
	mod: IMod
	setActive: setActive
}
