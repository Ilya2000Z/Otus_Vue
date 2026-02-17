export const typeDefs = `#graphql
  type Item {
    id: ID!
    title: String!
    status: String!
  }
  type Query {
    items: [Item!]!
  }
  type Mutation {
    addItem(title: String!, status: String): Item!
    setItemStatus(id: ID!, status: String!): Item
  }
  type Subscription {
    itemAdded: Item!
    itemStatusChanged: Item!
  }
`

const items = [
  { id: '1', title: 'Заказ #1001', status: 'В обработке' },
  { id: '2', title: 'Заказ #1002', status: 'Отправлен' },
  { id: '3', title: 'Заказ #1003', status: 'Доставлен' },
]
let idCounter = 4

const statuses = ['В обработке', 'Отправлен', 'В пути', 'Доставлен']

export function getItems() {
  return items
}

export function addItem(title, status = 'В обработке') {
  const item = { id: String(idCounter++), title, status }
  items.push(item)
  return item
}

export function setItemStatus(id, status) {
  const item = items.find((i) => i.id === id)
  if (item) {
    item.status = status
    return item
  }
  return null
}

export function getItemById(id) {
  return items.find((i) => i.id === id)
}

export function createResolvers(pubsub) {
  return {
    Query: {
      items: () => getItems(),
    },
    Mutation: {
      addItem: (_, { title, status }) => {
        const item = addItem(title, status)
        pubsub.publish('ITEM_ADDED', { itemAdded: item })
        return item
      },
      setItemStatus: (_, { id, status }) => {
        const item = setItemStatus(id, status)
        if (item) pubsub.publish('ITEM_STATUS_CHANGED', { itemStatusChanged: item })
        return item
      },
    },
    Subscription: {
      itemAdded: {
        subscribe: (_, __, context) => context.pubsub.subscribe('ITEM_ADDED'),
        resolve: (payload) => payload.itemAdded,
      },
      itemStatusChanged: {
        subscribe: (_, __, context) => context.pubsub.subscribe('ITEM_STATUS_CHANGED'),
        resolve: (payload) => payload.itemStatusChanged,
      },
    },
  }
}

export { items }

export function startStatusDemo(pubsub) {
  const statuses = ['В обработке', 'Отправлен', 'В пути', 'Доставлен']
  setInterval(() => {
    if (items.length === 0) return
    const idx = Math.floor(Math.random() * items.length)
    const item = items[idx]
    const nextStatus = statuses[(statuses.indexOf(item.status) + 1) % statuses.length]
    item.status = nextStatus
    pubsub.publish('ITEM_STATUS_CHANGED', { itemStatusChanged: item })
  }, 4000)
}
