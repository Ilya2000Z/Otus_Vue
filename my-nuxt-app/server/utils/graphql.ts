import { buildSchema, graphql } from 'graphql'

const products = [
  { id: '1', title: 'Ноутбук Pro', price: 89990, category: 'tech', description: 'Мощный ноутбук для работы и учёбы.' },
  { id: '2', title: 'Беспроводные наушники', price: 4990, category: 'tech', description: 'Чистый звук, до 20 часов работы.' },
  { id: '3', title: 'Клавиатура механическая', price: 7990, category: 'tech', description: 'RGB подсветка, переключатели MX.' },
  { id: '4', title: 'Футболка оверсайз', price: 1990, category: 'wear', description: 'Хлопок 100%, унисекс.' },
  { id: '5', title: 'Рюкзак городской', price: 4490, category: 'wear', description: 'Отделение для ноутбука 15".' },
]

const schema = buildSchema(`
  type Product {
    id: ID!
    title: String!
    price: Int!
    category: String!
    description: String
  }
  type Query {
    products(category: String): [Product!]!
    product(id: ID!): Product
  }
`)

const rootValue = {
  products: ({ category }: { category?: string }) =>
    category ? products.filter((p) => p.category === category) : products,
  product: ({ id }: { id: string }) => products.find((p) => p.id === id) ?? null,
}

export async function executeGraphQL(query: string, variables?: Record<string, unknown>) {
  const result = await graphql({ schema, source: query, rootValue, variableValues: variables })
  return result
}
