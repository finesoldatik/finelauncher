import veBg from '../../assets/images/ve/bg.png'
import veIcon from '../../assets/images/ve/ve.png'

interface InstanceProps {
	name: string
}

export default function Instance({ name }: InstanceProps) {
	return (
		<div className='flex flex-col justify-between'>
			<div>
				<div
					className='flex relative bg-cover bg-no-repeat bg-center w-full h-36'
					style={{ backgroundImage: `url(${veBg})` }}
				>
					<div className='bg-black bg-opacity-30 h-full w-full'></div>
					<div className='flex flex-row absolute top-16 w-full'>
						<img
							className='ml-1 w-[20%] h-[20%] max-w-48 max-h-48 mt-16 transition-all duration-200'
							src={veIcon}
							alt='icon'
						/>
						<div className='flex flex-col flex-nowrap ml-2 pt-[86px] text-xl w-[60%] transition-all duration-500'>
							<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
								{name}
							</h1>
							<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
								v0.20.3
							</h1>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full h-screen py-1 px-2 md:mt-[140px] lg:mt-[184px] bg-base-200 border-l-base-300 border-l-2 transition-all duration-100'>
				<div></div>
			</div>
		</div>
	)
}
