import { executeGraphQL } from '../utils/graphql'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ query: string; variables?: Record<string, unknown> }>(event)
  if (!body?.query) {
    throw createError({ statusCode: 400, message: 'Missing query' })
  }
  const result = await executeGraphQL(body.query, body.variables)
  if (result.errors?.length) {
    throw createError({ statusCode: 400, message: result.errors[0].message })
  }
  return result.data
})
