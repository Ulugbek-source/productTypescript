import type { FC } from 'react'
import type { ProductType } from '../@types/ProductType'

const ProductItem: FC<{ item: ProductType }> = ({ item }) => {
	return (
		<div className='w-[300px] overflow-hidden rounded-[5px] bg-amber-100'>
			<img
				className='mb-[10px]'
				src={item.images[0]}
				alt='Products image'
				width={300}
				height={200}
			/>
			<div className='p-3'>
				<h2 className='font-bold mb-[5px] line-clamp-1 text-[20px]'>
					{item.title}
				</h2>
				<p className='line-clamp-3 font-normal text-[18px]'>
					{item.description}
				</p>
				<div className='flex items-center justify-between'>
					<strong className='capitalize'>{item.category}</strong>
					<strong>{item.rating}</strong>
				</div>
				<div className='flex items-center justify-between'>
					<strong>{item.brand}</strong>
					<strong>{item.price} $</strong>
				</div>
			</div>
		</div>
	)
}

export default ProductItem
