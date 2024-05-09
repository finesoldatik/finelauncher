import Select from '../components/select/Select'

export default function NewVersion() {
	return (
		<>
			<input className='default' type='text' placeholder='Введите имя версии' />
			<Select />
			<button className='default'>Установить</button>
		</>
	)
}
