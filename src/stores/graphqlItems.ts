import { defineStore } from 'pinia'
import { ref } from 'vue'
import { apolloClient } from '../graphql/client'
import {
  ITEMS_QUERY,
  ADD_ITEM_MUTATION,
  ITEM_ADDED_SUBSCRIPTION,
  ITEM_STATUS_CHANGED_SUBSCRIPTION,
} from '../graphql/operations'

export interface GraphQLItem {
  id: string
  title: string
  status: string
}

export const useGraphQLItemsStore = defineStore('graphqlItems', () => {
  const items = ref<GraphQLItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchItems() {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query<{ items: GraphQLItem[] }>({
        query: ITEMS_QUERY,
      })
      items.value = result.data?.items ?? []
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка загрузки'
      items.value = []
    } finally {
      loading.value = false
    }
  }

  async function addItem(title: string, status?: string) {
    error.value = null
    try {
      await apolloClient.mutate({
        mutation: ADD_ITEM_MUTATION,
        variables: { title, status },
      })
      await fetchItems()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Ошибка добавления'
    }
  }

  function updateItem(updated: GraphQLItem) {
    const idx = items.value.findIndex((i) => i.id === updated.id)
    if (idx >= 0) {
      items.value = [
        ...items.value.slice(0, idx),
        { ...updated },
        ...items.value.slice(idx + 1),
      ]
    } else {
      items.value = [...items.value, { ...updated }]
    }
  }

  function subscribeToUpdates() {
    const addedObs = apolloClient.subscribe<{ itemAdded: GraphQLItem }>({
      query: ITEM_ADDED_SUBSCRIPTION,
    })
    type Sub = { subscribe: (next: (r: { data?: { itemAdded: GraphQLItem } }) => void) => { unsubscribe: () => void } }
    const addedSub = (addedObs as unknown as Sub).subscribe((result) => {
      if (result.data?.itemAdded) updateItem(result.data.itemAdded)
    })

    const statusObs = apolloClient.subscribe<{ itemStatusChanged: GraphQLItem }>({
      query: ITEM_STATUS_CHANGED_SUBSCRIPTION,
    })
    type SubStatus = { subscribe: (next: (r: { data?: { itemStatusChanged: GraphQLItem } }) => void) => { unsubscribe: () => void } }
    const statusSub = (statusObs as unknown as SubStatus).subscribe((result) => {
      if (result.data?.itemStatusChanged) updateItem(result.data.itemStatusChanged)
    })

    return () => {
      addedSub.unsubscribe()
      statusSub.unsubscribe()
    }
  }

  return {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    subscribeToUpdates,
  }
})
