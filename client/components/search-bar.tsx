import { CATEGORIES, COLORS, SORT_OPTIONS } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
	Modal,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'

interface Props {
	onSearch: (values: {
		searchQuery: string
		category: string
		filter: string
	}) => void
}

export default function SearchBar({ onSearch }: Props) {
	const [open, setOpen] = useState(false)

	const [searchQuery, setSearchQuery] = useState('')

	const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0])

	const [selectedCategory, setSelectedCategory] = useState(
		CATEGORIES.find(c => c.slug === 'all') || CATEGORIES[0],
	)

	const handleApply = () => {
		onSearch({
			searchQuery,
			category: selectedCategory.slug,
			filter: selectedSort.slug,
		})

		setOpen(false)
	}

	const handleReset = () => {
		setSearchQuery('')
		setSelectedSort(SORT_OPTIONS[0])
		setSelectedCategory(CATEGORIES[0])

		onSearch({
			searchQuery: '',
			category: '',
			filter: '',
		})
	}

	return (
		<>
			<View className='flex-row gap-2 mb-3 mx-4 my-2'>
				<View className='flex-1 flex-row items-center bg-white rounded-xl border border-gray-100'>
					<Ionicons
						name='search'
						className='ml-4'
						size={20}
						color={COLORS.secondary}
					/>

					<TextInput
						value={searchQuery}
						onChangeText={setSearchQuery}
						onSubmitEditing={handleApply}
						className='flex-1 ml-2 text-primary px-4 py-3'
						placeholder='Search products...'
						returnKeyType='search'
						placeholderTextColor={COLORS.secondary}
					/>
				</View>

				<TouchableOpacity
					onPress={() => setOpen(true)}
					className='bg-gray-800 w-12 h-12 items-center justify-center rounded-xl'
				>
					<Ionicons name='options-outline' size={24} color={'white'} />
				</TouchableOpacity>
			</View>

			<Modal visible={open} transparent animationType='slide'>
				<View className='flex-1 bg-black/40 justify-end'>
					<View className='bg-white rounded-t-[32px] px-6 pt-6 pb-10 min-h-[60%]'>
						<View className='flex-row items-center justify-between'>
							<Text className='text-3xl font-bold text-black'>Filters</Text>

							<Pressable onPress={() => setOpen(false)}>
								<Ionicons name='close' size={30} color='black' />
							</Pressable>
						</View>

						<View className='mt-8'>
							<Text className='text-xl font-semibold mb-4 text-black'>
								Sort By
							</Text>

							<View className='flex-row flex-wrap gap-3'>
								{SORT_OPTIONS.map(item => {
									const active = selectedSort === item

									return (
										<Pressable
											key={item.id}
											onPress={() => setSelectedSort(item)}
											className={`
												px-5 py-3 rounded-full border
												${active ? 'bg-black border-black' : 'bg-white border-gray-200'}
											`}
										>
											<Text
												className={`text-base ${
													active ? 'text-white' : 'text-black'
												}`}
											>
												{item.name}
											</Text>
										</Pressable>
									)
								})}
							</View>
						</View>

						<View className='mt-8'>
							<Text className='text-xl font-semibold mb-4 text-black'>
								Category
							</Text>

							<View className='flex-row flex-wrap gap-3'>
								{CATEGORIES.map(item => {
									const active = selectedCategory === item

									return (
										<Pressable
											key={item.id}
											onPress={() => setSelectedCategory(item)}
											className={`
												px-5 py-3 rounded-full border
												${active ? 'bg-black border-black' : 'bg-white border-gray-200'}
											`}
										>
											<Text
												className={`text-base ${
													active ? 'text-white' : 'text-black'
												}`}
											>
												{item.name}
											</Text>
										</Pressable>
									)
								})}
							</View>
						</View>

						<View className='flex-row gap-4 mt-auto pt-10'>
							<TouchableOpacity
								onPress={handleReset}
								className='flex-1 border border-gray-300 rounded-full py-4'
							>
								<Text className='text-center text-lg font-semibold text-black'>
									Reset
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={handleApply}
								className='flex-1 bg-black rounded-full py-4'
							>
								<Text className='text-center text-lg font-semibold text-white'>
									Apply
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</>
	)
}
