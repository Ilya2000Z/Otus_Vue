import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCatalogStore } from '../catalog'
import type { Product } from '../../types'
import * as api from '../../services/api'

vi.mock('../../services/api', () => ({
  productService: {
    getAllProducts: vi.fn(),
  },
}))

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 100,
    description: 'D1',
    category: 'c1',
    image: 'img1',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 200,
    description: 'D2',
    category: 'c2',
    image: 'img2',
  },
]

describe('useCatalogStore', () => {
  let store: ReturnType<typeof useCatalogStore>

  beforeEach(() => {
    store = useCatalogStore()
    vi.mocked(api.productService.getAllProducts).mockReset()
  })

  it('загружает товары и кладёт в стейт', async () => {
    vi.mocked(api.productService.getAllProducts).mockResolvedValue(mockProducts)
    await store.fetchProducts()
    expect(store.products).toEqual(mockProducts)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it('во время загрузки loading true', async () => {
    let resolve: (value: Product[]) => void
    const p = new Promise<Product[]>((r) => { resolve = r })
    vi.mocked(api.productService.getAllProducts).mockReturnValue(p)
    const loadPromise = store.fetchProducts()
    expect(store.loading).toBe(true)
    resolve!(mockProducts)
    await loadPromise
    expect(store.loading).toBe(false)
  })

  it('при ошибке API записывает error и очищает products', async () => {
    vi.mocked(api.productService.getAllProducts).mockRejectedValue(new Error('fail'))
    await store.fetchProducts()
    expect(store.error).toBe('Ошибка загрузки товаров')
    expect(store.products).toEqual([])
    expect(store.loading).toBe(false)
  })

  it('getProductById возвращает товар по id', async () => {
    vi.mocked(api.productService.getAllProducts).mockResolvedValue(mockProducts)
    await store.fetchProducts()
    expect(store.getProductById(1)).toEqual(mockProducts[0])
    expect(store.getProductById(99)).toBeUndefined()
  })
})
