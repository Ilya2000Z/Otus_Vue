import { ref, computed } from 'vue'
import type { Product } from '../types'

export interface CartItem {
  product: Product
  quantity: number
}

const cartItems = ref<CartItem[]>([])

// Загрузка корзины из localStorage
const loadCart = () => {
  const saved = localStorage.getItem('cart')
  if (saved) {
    try {
      cartItems.value = JSON.parse(saved)
    } catch (e) {
      console.error('Ошибка загрузки корзины:', e)
      cartItems.value = []
    }
  }
}

// Сохранение корзины в localStorage
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cartItems.value))
}

// Инициализация при первом использовании
if (typeof window !== 'undefined') {
  loadCart()
}

export const useCart = () => {
  const addToCart = (product: Product) => {
    const existingItem = cartItems.value.find((item) => item.product.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({
        product,
        quantity: 1,
      })
    }
    
    saveCart()
  }

  const removeFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter((item) => item.product.id !== productId)
    saveCart()
  }

  const updateQuantity = (productId: number, quantity: number) => {
    const item = cartItems.value.find((item) => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveCart()
      }
    }
  }

  const clearCart = () => {
    cartItems.value = []
    saveCart()
  }

  const totalItems = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  })

  return {
    cartItems: computed(() => cartItems.value),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }
}

