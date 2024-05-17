interface IElement {
	id: number
	active: number
	setActive: React.Dispatch<React.SetStateAction<number>>
	image: string
	link: string
}

export interface ItemProps {
	element: IElement
}
