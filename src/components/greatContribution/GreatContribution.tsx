import styles from './GreatContribution.module.scss'

export default function GreatContribution() {
	return (
		<div className={'black-style ' + styles['container']}>
			<p>Большой вклад внесли:</p>
			<p className='violet-text'>@kotisoff</p>
			<p className='violet-text'>@booleanfalse</p>
			<p className='violet-text'>@rafalesr</p>
			<p className='violet-text'>@finesoldatik</p>
			<p className='violet-text'>@callfishtwink</p>
		</div>
	)
}
