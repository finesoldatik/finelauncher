import Theme from "../../components/Theme";

export default function Settings() {
	return (
		<>
			<div className='flex gap-3 bg-base-300 p-10'>
				<Theme name='cmyk' />
				<Theme name='light' />
				<Theme name='dark' />
				<Theme name='bumblebee' />
				<Theme name='cupcake' />
				<Theme name='retro' />
			</div>
		ы</>
	)
}
