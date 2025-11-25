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
    <ProductList :filters="searchFilters" />
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  background: #f5f5f5;
}

</style>

