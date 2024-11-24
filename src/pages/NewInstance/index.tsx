import { useState } from 'react'
import ConfirmModal from '../../components/generic/ConfirmModal'

export default function NewInstance() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	return (
		<div className='w-full h-screen'>
			<div className='btn btn-primary' onClick={() => setIsModalOpen(true)}>
				aaaaaaaaaaa
			</div>
			<ConfirmModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
		</div>
	)
}
