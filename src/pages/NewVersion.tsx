import VersionSelect from '../components/version-select/VersionSelect'

export default function NewVersion() {
	return (
		<>
			<input
				className='default'
				type='text'
				style={{ cursor: 'text' }}
				placeholder='Введите имя версии'
			/>
			<VersionSelect />
			<button className='default'>Создать</button>
		</>
	)
}
