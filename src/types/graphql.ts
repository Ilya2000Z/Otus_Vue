export interface GraphQLItem {
  id: string
  title: string
  status: string
}

export interface ItemsQueryData {
  items: GraphQLItem[]
}

export interface ItemsQueryResult {
  data: ItemsQueryData
}

export interface AddItemMutationVariables {
  title: string
  status?: string
}

export interface AddItemMutationData {
  addItem: GraphQLItem
}

export interface AddItemMutationResult {
  data: AddItemMutationData
}

export interface ItemAddedSubscriptionData {
  itemAdded: GraphQLItem
}

export interface ItemAddedSubscriptionResult {
  data: ItemAddedSubscriptionData
}

export interface ItemStatusChangedSubscriptionData {
  itemStatusChanged: GraphQLItem
}

export interface ItemStatusChangedSubscriptionResult {
  data: ItemStatusChangedSubscriptionData
}

export type SubscriptionMessageType = 'itemAdded' | 'itemStatusChanged'

export interface ItemAddedWsMessage {
  type: 'itemAdded'
  payload: GraphQLItem
}

export interface ItemStatusChangedWsMessage {
  type: 'itemStatusChanged'
  payload: GraphQLItem
}

export type GraphQLSubscriptionMessage = ItemAddedWsMessage | ItemStatusChangedWsMessage

export interface SubscriptionObserver<T> {
  subscribe(next: (value: T) => void): { unsubscribe: () => void }
}

export type Unsubscribe = () => void
