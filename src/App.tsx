import axios from 'axios'
import { useEffect, useState, type ChangeEvent } from 'react'
import type { ProductType } from './@types/ProductType'
import { ProductItem } from './components'
import type { CategoryType } from './@types/CategoryType'
import { Loading } from './assets/images'

const App = () => {
	const [loading, setLoading] = useState(false)
	const [products, setProducts] = useState<ProductType[]>([])
	const [category, setCategory] = useState<CategoryType[]>([])
	const [categorySlug, setCategorySlug] = useState<string | null>(null)
	const [searchValue, setSearchValue] = useState('')

	useEffect(() => {
		setLoading(true)
		axios.get('https://dummyjson.com/products?limit=100').then(res => {
			setLoading(false)
			setProducts(res.data.products)
		})
	}, [])

	useEffect(() => {
		axios.get('https://dummyjson.com/products/categories').then(res => {
			setCategory(res.data)
		})
	}, [])

	useEffect(() => {
		if (categorySlug && categorySlug !== 'all') {
			setLoading(true)
			axios
				.get(`https://dummyjson.com/products/category/${categorySlug}`)
				.then(res => {
					setLoading(false)
					setProducts(res.data.products)
				})
		}
		if (categorySlug === 'all') {
			setLoading(true)
			axios.get('https://dummyjson.com/products?limit=100').then(res => {
				setLoading(false)
				setProducts(res.data.products)
			})
		}
	}, [categorySlug])

	const handleSearch = () => {
		if (!searchValue.trim()) return
		setLoading(true)
		axios
			.get(`https://dummyjson.com/products/search?q=${searchValue}`)
			.then(res => {
				setLoading(false)
				setProducts(res.data.products)
			})
	}

	function handleClickSelect(e: ChangeEvent<HTMLSelectElement>) {
		setCategorySlug(e.target.value)
	}

	return (
		<div className='p-5'>
			<div className='flex items-center justify-center gap-5 mb-5'>
				<input
					autoComplete='off'
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					className='w-[400px] rounded-[5px] py-[10px] pl-[10px] border-[1.5px] outline-none'
					type='text'
					placeholder='Search...'
					name='search'
				/>
				<button
					onClick={handleSearch}
					className='px-4 py-[10px] rounded-[5px] bg-blue-600 text-white cursor-pointer'
				>
					Search
				</button>
				<select
					onChange={handleClickSelect}
					className='w-[400px] rounded-[5px] py-[10px] pl-[10px] border-[1.5px] appearance-none'
				>
					<option value='all'>All</option>
					{category.map((item, index) => (
						<option key={index} value={item.slug}>
							{item.name}
						</option>
					))}
				</select>
			</div>
			<div className='flex flex-wrap justify-center gap-5'>
				{loading ? (
					<img src={Loading} alt='Loading image' width={200} height={200} />
				) : (
					products.map(item => <ProductItem key={item.id} item={item} />)
				)}
			</div>
		</div>
	)
}

export default App
