interface IElement {
	id: number
	active: number
	setActive: (value: number) => void
	image: string
	link: string
}

export interface IItemProps {
	element: IElement
}
