import axios from 'axios'
import type { Product, OrderFormData } from '../types'

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
})

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await api.get<Product[]>('/products')
    return response.data
  },

  async getProductById(id: number): Promise<Product> {
    const response = await api.get<Product>(`/products/${id}`)
    return response.data
  },
}

export const orderService = {
  async submitOrder(orderData: OrderFormData): Promise<any> {
    const response = await axios.post('https://httpbin.org/post', orderData)
    return response.data
  },
}

