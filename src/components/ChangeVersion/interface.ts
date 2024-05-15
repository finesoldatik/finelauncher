export type setActive = React.Dispatch<React.SetStateAction<boolean>>

export interface IMod {
	id: number
	downloadUrl: string
}

export interface IProps {
	active: boolean
	mod: IMod
	setActive: setActive
}
