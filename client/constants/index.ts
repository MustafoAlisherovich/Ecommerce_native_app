export const COLORS = {
	primary: '#111111',
	secondary: '#666666',
	background: '#FFFFFF',
	surface: '#F7F7F7',
	accent: '#FF4C3B',
	border: '#EEEEEE',
	error: '#FF4444',
}

export const CATEGORIES = [
	{ id: 1, name: 'All', icon: 'grid', slug: 'all' },
	{ id: 2, name: 'Men', icon: 'man-outline', slug: 'men' },
	{ id: 3, name: 'Women', icon: 'woman-outline', slug: 'women' },
	{ id: 4, name: 'Kids', icon: 'happy-outline', slug: 'kids' },
	{ id: 5, name: 'Shoes', icon: 'footsteps-outline', slug: 'shoes' },
	{ id: 6, name: 'Bag', icon: 'briefcase-outline', slug: 'bag' },
	{ id: 7, name: 'Other', icon: 'grid-outline', slug: 'other' },
]

export const SORT_OPTIONS = [
	{ id: 1, name: 'Newest', slug: 'newest' },
	{ id: 2, name: 'Oldest', slug: 'oldest' },
]

export const PROFILE_MENU = [
	{ id: 1, title: 'My Orders', icon: 'receipt-outline', route: '/orders' },
	{
		id: 2,
		title: 'Shipping Addresses',
		icon: 'location-outline',
		route: '/addresses',
	},
	{ id: 4, title: 'My Reviews', icon: 'star-outline', route: '/' },
	{ id: 5, title: 'Settings', icon: 'settings-outline', route: '/' },
]

export const getStatusColor = (status: string) => {
	switch (status) {
		case 'placed':
			return 'bg-yellow-50 text-yellow-900'
		case 'processing':
			return 'bg-indigo-50 text-indigo-900'
		case 'shipped':
			return 'bg-purple-50 text-purple-900'
		case 'delivered':
			return 'bg-green-50 text-green-900'
		case 'cancelled':
			return 'bg-red-50 text-red-900'
		default:
			return 'bg-gray-50 text-gray-900'
	}
}
