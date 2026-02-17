import { executeGraphQL } from '../utils/graphql'

export default defineEventHandler(async (event) => {
  const category = getQuery(event).category as string | undefined
  const query = `
    query GetProducts($category: String) {
      products(category: $category) {
        id
        title
        price
        category
        description
      }
    }
  `
  const result = await executeGraphQL(query, { category: category || undefined })
  const data = result.data as { products: Array<Record<string, unknown>> }
  return data?.products ?? []
})
