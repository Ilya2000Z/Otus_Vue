import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from '../cart'
import type { Product } from '../../types'

const mockProduct = (overrides?: Partial<Product>): Product => ({
  id: 1,
  title: 'Test',
  price: 10,
  description: 'Desc',
  category: 'cat',
  image: 'http://img',
  ...overrides,
})

describe('useCartStore', () => {
  let store: ReturnType<typeof useCartStore>

  beforeEach(() => {
    store = useCartStore()
    store.clear()
  })

  it('добавляет товар в корзину', () => {
    const product = mockProduct({ id: 1 })
    store.add(product)
    expect(store.items).toHaveLength(1)
    expect(store.items[0].product.id).toBe(1)
    expect(store.items[0].quantity).toBe(1)
  })

  it('увеличивает количество при повторном добавлении того же товара', () => {
    const product = mockProduct({ id: 1 })
    store.add(product)
    store.add(product)
    expect(store.items).toHaveLength(1)
    expect(store.items[0].quantity).toBe(2)
  })

  it('считает общее количество позиций', () => {
    store.add(mockProduct({ id: 1 }))
    store.add(mockProduct({ id: 1 }))
    store.add(mockProduct({ id: 2 }))
    expect(store.totalItems).toBe(3)
  })

  it('считает сумму корзины', () => {
    store.add(mockProduct({ id: 1, price: 10 }))
    store.add(mockProduct({ id: 1, price: 10 }))
    store.add(mockProduct({ id: 2, price: 5 }))
    expect(store.totalPrice).toBe(25)
  })

  it('изменяет количество товара через updateQuantity', () => {
    store.add(mockProduct({ id: 1, price: 10 }))
    store.updateQuantity(1, 5)
    expect(store.items[0].quantity).toBe(5)
    expect(store.totalPrice).toBe(50)
  })

  it('удаляет товар при количестве 0 или меньше', () => {
    store.add(mockProduct({ id: 1 }))
    store.updateQuantity(1, 0)
    expect(store.items).toHaveLength(0)
  })

  it('удаляет товар по id', () => {
    store.add(mockProduct({ id: 1 }))
    store.add(mockProduct({ id: 2 }))
    store.remove(1)
    expect(store.items).toHaveLength(1)
    expect(store.items[0].product.id).toBe(2)
  })

  it('очищает корзину', () => {
    store.add(mockProduct({ id: 1 }))
    store.clear()
    expect(store.items).toHaveLength(0)
    expect(store.totalPrice).toBe(0)
  })
})
