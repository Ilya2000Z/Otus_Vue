export interface Product {
  id: string
  title: string
  price: number
  category: string
  description?: string
}

export function useGraphQL() {
  const config = useRuntimeConfig()

  async function query<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
    const data = await $fetch<{ data?: T }>(config.public.graphqlEndpoint as string, {
      method: 'POST',
      body: { query, variables },
    })
    return data as T
  }

  async function getProducts(category?: string): Promise<Product[]> {
    const result = await query<{ products: Product[] }>(
      `
      query GetProducts($category: String) {
        products(category: $category) {
          id
          title
          price
          category
          description
        }
      }
    `,
      { category: category || undefined }
    )
    const data = result as { products?: Product[] }
    return data?.products ?? []
  }

  async function getProduct(id: string): Promise<Product | null> {
    const result = await query<{ product: Product | null }>(
      `
      query GetProduct($id: ID!) {
        product(id: $id) {
          id
          title
          price
          category
          description
        }
      }
    `,
      { id }
    )
    const data = result as { product?: Product | null }
    return data?.product ?? null
  }

  return { query, getProducts, getProduct }
}
