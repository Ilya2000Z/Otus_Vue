<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGraphQLItemsStore } from '../stores/graphqlItems'
import type { Unsubscribe } from '../types/graphql'

const store = useGraphQLItemsStore()
const { items, loading, error } = storeToRefs(store)

const newTitle: Ref<string> = ref<string>('')
let unsubscribe: Unsubscribe | null = null

onMounted(async (): Promise<void> => {
  await store.fetchItems()
  unsubscribe = store.subscribeToUpdates()
})

onUnmounted((): void => {
  unsubscribe?.()
})

async function handleAdd(): Promise<void> {
  const title: string = newTitle.value.trim()
  if (!title) return
  await store.addItem(title)
  newTitle.value = ''
}
</script>

<template>
  <div class="graphql-page">
    <div class="graphql-container">
      <h1>Заказы (GraphQL + WebSocket)</h1>
      <p class="graphql-desc">
        Список загружается по GraphQL API. Изменения статусов приходят в реальном времени по WebSocket.
      </p>

      <div class="add-form">
        <input
          v-model="newTitle"
          type="text"
          placeholder="Название заказа"
          class="add-input"
          @keydown.enter="handleAdd"
        />
        <button type="button" class="add-btn" @click="handleAdd">
          Добавить
        </button>
      </div>

      <div v-if="error" class="graphql-error">{{ error }}</div>
      <div v-else-if="loading" class="graphql-loading">Загрузка...</div>
      <ul v-else class="items-list">
        <li
          v-for="item in items"
          :key="item.id"
          class="item-row"
        >
          <span class="item-title">{{ item.title }}</span>
          <span class="item-status">{{ item.status }}</span>
        </li>
      </ul>
      <div v-if="!loading && items.length === 0" class="graphql-empty">
        Нет записей. Запустите GraphQL-сервер: npm run graphql:server
      </div>
    </div>
  </div>
</template>

<style scoped>
.graphql-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem 0;
}

.graphql-container {
  max-width: 640px;
  margin: 0 auto;
  padding: 0 2rem;
}

.graphql-container h1 {
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.75rem;
}

.graphql-desc {
  margin: 0 0 1.5rem 0;
  color: #666;
  font-size: 0.95rem;
}

.add-form {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.add-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
}

.add-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.add-btn:hover {
  opacity: 0.95;
}

.graphql-error {
  color: #e74c3c;
  padding: 1rem;
  background: #fee2e2;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.graphql-loading {
  color: #666;
  padding: 2rem;
  text-align: center;
}

.items-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.item-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.item-title {
  font-weight: 500;
  color: #333;
}

.item-status {
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 600;
}

.graphql-empty {
  text-align: center;
  color: #666;
  padding: 2rem;
}
</style>
