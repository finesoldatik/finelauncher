import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'

interface ConfirmModalProps {
	isModalOpen: boolean
	setIsModalOpen: (value: boolean) => void
}

export default function ConfirmModal({
	isModalOpen,
	setIsModalOpen,
}: ConfirmModalProps) {
	const modalRef = useRef(null)

	return (
		<div className='p-4'>
			<button onClick={() => setIsModalOpen(true)} className='btn btn-primary'>
				Open Modal
			</button>

			<CSSTransition
				in={isModalOpen}
				timeout={300}
				classNames='modal'
				unmountOnExit
				nodeRef={modalRef}
			>
				<div
					ref={modalRef}
					className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
				>
					<div className='modal modal-open'>
						<div className='modal-box'>
							<h2 className='font-bold text-lg'>Modal Title</h2>
							<p className='py-4'>This is the modal body.</p>
							<div className='modal-action'>
								<button
									onClick={() => setIsModalOpen(false)}
									className='btn btn-error'
								>
									Close
								</button>
							</div>
						</div>
					</div>
				</div>
			</CSSTransition>
		</div>
	)
}
