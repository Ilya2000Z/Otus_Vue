import { storeToRefs } from 'pinia'
import { useCartStore } from '../stores/cart'
import type { Product } from '../types'

export const useCart = () => {
  const store = useCartStore()
  const { items, totalItems, totalPrice } = storeToRefs(store)
  return {
    cartItems: items,
    totalItems,
    totalPrice,
    addToCart: (product: Product) => store.add(product),
    removeFromCart: (productId: number) => store.remove(productId),
    updateQuantity: store.updateQuantity,
    clearCart: store.clear,
  }
}
