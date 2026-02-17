import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type {
  GraphQLItem,
  ItemsQueryData,
  ItemAddedSubscriptionResult,
  ItemStatusChangedSubscriptionResult,
  SubscriptionObserver,
  Unsubscribe,
} from '../types/graphql'
import { apolloClient } from '../graphql/client'
import {
  ITEMS_QUERY,
  ADD_ITEM_MUTATION,
  ITEM_ADDED_SUBSCRIPTION,
  ITEM_STATUS_CHANGED_SUBSCRIPTION,
} from '../graphql/operations'

export type { GraphQLItem }

export const useGraphQLItemsStore = defineStore('graphqlItems', () => {
  const items: Ref<GraphQLItem[]> = ref<GraphQLItem[]>([])
  const loading: Ref<boolean> = ref(false)
  const error: Ref<string | null> = ref<string | null>(null)

  async function fetchItems(): Promise<void> {
    loading.value = true
    error.value = null
    try {
      const result = await apolloClient.query<ItemsQueryData>({
        query: ITEMS_QUERY,
      })
      items.value = result.data?.items ?? []
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Ошибка загрузки'
      items.value = []
    } finally {
      loading.value = false
    }
  }

  async function addItem(title: string, status?: string): Promise<void> {
    error.value = null
    try {
      await apolloClient.mutate({
        mutation: ADD_ITEM_MUTATION,
        variables: { title, status },
      })
      await fetchItems()
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Ошибка добавления'
    }
  }

  function updateItem(updated: GraphQLItem): void {
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

  function subscribeToUpdates(): Unsubscribe {
    const addedObs = apolloClient.subscribe<ItemAddedSubscriptionResult['data']>({
      query: ITEM_ADDED_SUBSCRIPTION,
    })
    const addedSub = (
      addedObs as unknown as SubscriptionObserver<ItemAddedSubscriptionResult>
    ).subscribe((result: ItemAddedSubscriptionResult) => {
      if (result.data?.itemAdded) updateItem(result.data.itemAdded)
    })

    const statusObs = apolloClient.subscribe<
      ItemStatusChangedSubscriptionResult['data']
    >({
      query: ITEM_STATUS_CHANGED_SUBSCRIPTION,
    })
    const statusSub = (
      statusObs as unknown as SubscriptionObserver<ItemStatusChangedSubscriptionResult>
    ).subscribe((result: ItemStatusChangedSubscriptionResult) => {
      if (result.data?.itemStatusChanged)
        updateItem(result.data.itemStatusChanged)
    })

    return (): void => {
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
