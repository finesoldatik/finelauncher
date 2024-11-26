import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder, faGear, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

interface InstanceProps {
	name: string
}

export default function Instance({ name }: InstanceProps) {
	return (
		<div className='flex flex-col justify-between'>
			<div>
				<div className='flex relative bg-cover bg-no-repeat bg-center w-full h-36 bg-[url(/images/ve/bg.png)]'>
					<div className='bg-black bg-opacity-30 h-full w-full'></div>
					<div className='flex flex-row absolute top-16 w-full'>
						<img
							className='ml-1 w-32 h-32 mt-16 transition-all duration-200'
							src='/images/ve/ve.png'
							alt='icon'
						/>
						<div className='w-full h-full flex flex-col pt-[86px]'>
							<div className='flex flex-col flex-nowrap ml-2 text-xl w-[60%] transition-all duration-500'>
								<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
									{name}
								</h1>
								<h1 className='whitespace-nowrap overflow-hidden text-ellipsis'>
									v0.20.3
								</h1>
							</div>
							<div className='h-full pt-[12px] gap-1 flex items-end'>
								<div className='btn btn-sm btn-success w-48'>Играть</div>
								<div className='join join-horizontal'>
									<div className='join-item btn btn-sm btn-neutral w-8'>
										<FontAwesomeIcon icon={faFolder} />
									</div>
									<div className='join-item btn btn-sm btn-neutral w-8'>
										<FontAwesomeIcon icon={faGear} />
									</div>
									<div className='join-item btn btn-sm btn-error w-8'>
										<FontAwesomeIcon icon={faTrashCan} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className='w-full h-screen py-1 px-2 mt-[122px] bg-base-200 transition-all duration-100'>
				<div>
					<Link to={`/voxelworld/${name}`} className='btn btn-primary'>
						VoxelWorld
					</Link>
				</div>
			</div>
		</div>
	)
}
