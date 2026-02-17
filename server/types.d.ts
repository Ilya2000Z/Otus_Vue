export interface GraphQLItem {
  id: string
  title: string
  status: string
}

export interface GraphQLContext {
  pubsub: {
    publish: (event: string, payload: Record<string, GraphQLItem>) => void
    subscribe: (event: string) => AsyncIterator<{ itemAdded?: GraphQLItem; itemStatusChanged?: GraphQLItem }>
  }
}

export interface AddItemArgs {
  title: string
  status?: string
}

export interface SetItemStatusArgs {
  id: string
  status: string
}
