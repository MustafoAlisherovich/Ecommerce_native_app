import axios from 'axios'

const api = axios.create({
	baseURL: 'https://ecommerceapp-omega.vercel.app/api',
})

export default api
