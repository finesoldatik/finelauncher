import { FC } from 'react'
import styles from './NewVersionNameInput.module.scss'
import {INewVersionNameInputProps} from './NewVersionNameInput.interface'

const NewVersionNameInput: FC<INewVersionNameInputProps> = ({
	register,
	errors,
	existsVersion,
}) => {
	console.log('NewVersionSelect Render')

	return (
		<>
			<p className={styles['mt-10']}>* Обязательное поле</p>
			<p className='violet-text'>Не более 12 символов</p>

			<input
				{...register('label', {
					required: 'Заполните это поле!',
					maxLength: 12,
				})}
				className={`black-style ${styles['name-input']}`}
				type='text'
				placeholder='Введите имя версии'
			/>

			{errors?.label && (
				<div className='error-text'>{errors.label.message}</div>
			)}

			{existsVersion ? (
				<p className='error-text'>Версия с таким именем уже существует!</p>
			) : (
				<></>
			)}
		</>
	)
}

export default NewVersionNameInput
