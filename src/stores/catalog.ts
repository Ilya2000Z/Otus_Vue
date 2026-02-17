import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productService } from '../services/api'
import type { Product } from '../types'

export const useCatalogStore = defineStore('catalog', () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const fetchProducts = async () => {
    loading.value = true
    error.value = null
    try {
      products.value = await productService.getAllProducts()
    } catch (e) {
      error.value = 'Ошибка загрузки товаров'
      products.value = []
    } finally {
      loading.value = false
    }
  }

  const getProductById = (id: number) => products.value.find((p) => p.id === id)

  return {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
  }
})
