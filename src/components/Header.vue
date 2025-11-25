<script setup lang="ts">
import { ref } from 'vue'
import type { SearchFilters } from '../types'

const emit = defineEmits<{
  search: [filters: SearchFilters]
}>()

const searchQuery = ref('')
const minPrice = ref<number | null>(null)
const maxPrice = ref<number | null>(null)

const handleSearch = () => {
  emit('search', {
    query: searchQuery.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
  })
}

const clearFilters = () => {
  searchQuery.value = ''
  minPrice.value = null
  maxPrice.value = null
  handleSearch()
}
</script>

<template>
  <header class="header">
    <div class="header-content">
      <h1 class="logo">🛍️ Интернет-магазин</h1>
      <div class="search-form">
        <div class="search-group">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск по названию..."
            class="search-input"
            @input="handleSearch"
          />
        </div>
        <div class="price-filters">
          <input
            v-model.number="minPrice"
            type="number"
            placeholder="Мин. цена"
            class="price-input"
            min="0"
            step="0.01"
            @input="handleSearch"
          />
          <span class="price-separator">-</span>
          <input
            v-model.number="maxPrice"
            type="number"
            placeholder="Макс. цена"
            class="price-input"
            min="0"
            step="0.01"
            @input="handleSearch"
          />
        </div>
        <button type="button" class="clear-btn" @click="clearFilters">
          Очистить
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 2rem;
}

.logo {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 700;
}

.search-form {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-group {
  flex: 1;
  min-width: 200px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.price-filters {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price-input {
  width: 120px;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.price-separator {
  font-weight: bold;
  font-size: 1.2rem;
}

.clear-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.clear-btn:hover {
  background: white;
  color: #667eea;
}

@media (max-width: 768px) {
  .search-form {
    flex-direction: column;
  }

  .price-filters {
    width: 100%;
  }

  .price-input {
    flex: 1;
  }

  .clear-btn {
    width: 100%;
  }
}
</style>

