import { CSSTransition } from 'react-transition-group'
import { useRef } from 'react'

interface ConfirmModalProps {
	isModalOpen: boolean
	setIsModalOpen: (value: boolean) => void
	onConfirm: () => void
}

export default function ConfirmModal({
	isModalOpen,
	setIsModalOpen,
	onConfirm,
}: ConfirmModalProps) {
	const modalRef = useRef(null)

	return (
		<CSSTransition
			in={isModalOpen}
			timeout={300}
			classNames='modal'
			unmountOnExit
			nodeRef={modalRef}
		>
			<div
				ref={modalRef}
				className='h-screen w-screen fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]'
				onClick={() => setIsModalOpen(false)}
			>
				<div className='modal-box' onClick={e => e.stopPropagation()}>
					<h2 className='font-bold text-lg'>Вы уверены?</h2>
					<p className='py-4'>Это действие нельзя отменить.</p>
					<div className='modal-action'>
						<button
							onClick={() => setIsModalOpen(false)}
							className='btn btn-neutral'
						>
							Нет
						</button>
						<button
							onClick={() => {
								onConfirm()
								setIsModalOpen(false)
							}}
							className='btn btn-error'
						>
							Да
						</button>
					</div>
				</div>
			</div>
		</CSSTransition>
	)
}
