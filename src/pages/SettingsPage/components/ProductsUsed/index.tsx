import { FC } from 'react'
import styles from './ProductsUsed.module.scss'

const products = ['voxelworld.ru', 'icons8.ru']

const ProductsUsed: FC = () => {
	return (
		<div className={`black-style ${styles['container']}`}>
			<p>Используемые продукты:</p>
			{products.map((product, idx) => (
				<p className='violet-text' key={idx}>
					{product}
				</p>
			))}
		</div>
	)
}

export default ProductsUsed
