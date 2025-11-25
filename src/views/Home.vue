<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Header from '../components/Header.vue'
import ProductList from '../components/ProductList.vue'
import type { SearchFilters, ProductFormData } from '../types'

const router = useRouter()
const searchFilters = ref<SearchFilters>({
  query: '',
  minPrice: null,
  maxPrice: null,
})

const handleSearch = (filters: SearchFilters) => {
  searchFilters.value = filters
}

const handleProductCreated = (product: ProductFormData) => {
  console.log('Новый товар создан:', product)
  // Здесь можно добавить логику сохранения товара
}
</script>

<template>
  <div class="home">
    <Header @search="handleSearch" />
    <div class="nav-buttons">
      <button class="nav-btn" @click="router.push('/order')">
        Оформить заказ
      </button>
      <button class="nav-btn secondary" @click="router.push('/product/new')">
        Добавить товар
      </button>
    </div>
    <ProductList :filters="searchFilters" />
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f5f5;
}

.nav-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.nav-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.nav-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.nav-btn.secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.nav-btn.secondary:hover {
  background: #667eea;
  color: white;
}

@media (max-width: 768px) {
  .nav-buttons {
    flex-direction: column;
    padding: 1rem;
  }

  .nav-btn {
    width: 100%;
  }
}
</style>

