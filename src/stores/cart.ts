import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Product } from '../types'

export interface CartItem {
  product: Product
  quantity: number
}

const CART_KEY = 'cart'

const loadCart = (): CartItem[] => {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem(CART_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(loadCart())

  watch(
    items,
    (val) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(CART_KEY, JSON.stringify(val))
      }
    },
    { deep: true }
  )

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  )

  function add(product: Product) {
    const existing = items.value.find((i) => i.product.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      items.value.push({ product, quantity: 1 })
    }
  }

  function remove(productId: number) {
    items.value = items.value.filter((i) => i.product.id !== productId)
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = items.value.find((i) => i.product.id === productId)
    if (!item) return
    if (quantity <= 0) {
      remove(productId)
    } else {
      item.quantity = quantity
    }
  }

  function clear() {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    add,
    remove,
    updateQuantity,
    clear,
  }
})
