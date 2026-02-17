import { describe, it, expect, beforeEach } from 'vitest'
import { useCart } from '../useCart'
import type { Product } from '../../types'

const mockProduct: Product = {
  id: 1,
  title: 'Товар',
  price: 25,
  description: 'Описание',
  category: 'cat',
  image: 'http://img',
}

describe('useCart', () => {
  beforeEach(async () => {
    const { useCartStore } = await import('../../stores/cart')
    useCartStore().clear()
  })

  it('добавляет товар в корзину через addToCart', () => {
    const { cartItems, addToCart } = useCart()
    expect(cartItems.value).toHaveLength(0)
    addToCart(mockProduct)
    expect(cartItems.value).toHaveLength(1)
    expect(cartItems.value[0].product.id).toBe(1)
    expect(cartItems.value[0].quantity).toBe(1)
  })

  it('totalPrice считает сумму с учётом количества', () => {
    const { addToCart, updateQuantity, totalPrice } = useCart()
    addToCart(mockProduct)
    updateQuantity(1, 3)
    expect(totalPrice.value).toBe(75)
  })

  it('removeFromCart удаляет позицию', () => {
    const { addToCart, removeFromCart, cartItems } = useCart()
    addToCart(mockProduct)
    expect(cartItems.value).toHaveLength(1)
    removeFromCart(1)
    expect(cartItems.value).toHaveLength(0)
  })

  it('clearCart очищает корзину', () => {
    const { addToCart, clearCart, cartItems, totalPrice } = useCart()
    addToCart(mockProduct)
    clearCart()
    expect(cartItems.value).toHaveLength(0)
    expect(totalPrice.value).toBe(0)
  })
})
