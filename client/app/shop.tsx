import Header from '@/components/header'
import ProductCard from '@/components/product-card'
import SearchBar from '@/components/search-bar'
import { COLORS } from '@/constants'
import api from '@/constants/api'
import { Product } from '@/constants/types'
import { useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Shop() {
	const params = useLocalSearchParams()

	const [products, setProducts] = useState<Product[]>([])
	const [loading, setLoading] = useState(true)
	const [loadingMore, setLoadingMore] = useState(false)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)

	const [activeCategory, setActiveCategory] = useState<string | undefined>(
		undefined,
	)
	const [activeSearch, setActiveSearch] = useState<string | undefined>(
		undefined,
	)
	const [activeFilter, setActiveFilter] = useState<string | undefined>(
		undefined,
	)

	const fetchProducts = async (
		pageNumber = 1,
		searchQuery?: string,
		category?: string,
		filter?: string,
	) => {
		if (pageNumber === 1) {
			setLoading(true)
		} else {
			setLoadingMore(true)
		}

		try {
			const queryParams: Record<string, string | number> = {
				page: pageNumber,
				limit: 10,
			}

			if (searchQuery?.trim()) {
				queryParams.searchQuery = searchQuery
			}

			if (category && category.toLowerCase() !== 'all') {
				queryParams.category = category
			}

			if (filter) {
				queryParams.filter = filter
			}

			const { data } = await api.get('/products', {
				params: queryParams,
			})

			if (pageNumber === 1) {
				setProducts(data.data)
			} else {
				setProducts(prev => [...prev, ...data.data])
			}

			setHasMore(data.pagination.page < data.pagination.pages)
			setPage(pageNumber)
		} catch (error) {
			console.error('Pagination error:', error)
		} finally {
			setLoading(false)
			setLoadingMore(false)
		}
	}

	const loadMore = () => {
		if (!loadingMore && !loading && hasMore) {
			fetchProducts(page + 1, activeSearch, activeCategory, activeFilter)
		}
	}

	useEffect(() => {
		const paramCategory = Array.isArray(params.category)
			? params.category[0]
			: params.category

		setActiveCategory(paramCategory)
		fetchProducts(1, activeSearch, paramCategory, activeFilter)
	}, [params.category])
	return (
		<SafeAreaView className='flex-1 bg-surface' edges={['top']}>
			<Header title='Shop' showBack showCart />

			{/* SEARCH BAR */}
			<SearchBar
				onSearch={({ searchQuery, category, filter }) => {
					setActiveSearch(searchQuery)
					setActiveCategory(category)
					setActiveFilter(filter)

					fetchProducts(1, searchQuery, category, filter)
				}}
			/>

			{loading ? (
				<View className='flex-1 justify-center items-center'>
					<ActivityIndicator size={'large'} color={COLORS.primary} />
				</View>
			) : (
				<FlatList
					data={products}
					keyExtractor={item => item._id}
					numColumns={2}
					contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
					columnWrapperStyle={{ justifyContent: 'space-between' }}
					renderItem={({ item }) => <ProductCard product={item} />}
					onEndReached={loadMore}
					onEndReachedThreshold={0.5}
					ListFooterComponent={
						loadingMore ? (
							<View className='py-4'>
								<ActivityIndicator size={'small'} color={COLORS.primary} />
							</View>
						) : null
					}
					ListEmptyComponent={
						!loading && (
							<View className='flex-1 items-center justify-center py-20'>
								<Text className='text-secondary'>No products found</Text>
							</View>
						)
					}
				/>
			)}
		</SafeAreaView>
	)
}
