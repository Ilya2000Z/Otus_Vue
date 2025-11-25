<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { productService } from '../services/api'
import type { Product, SearchFilters } from '../types'

const props = defineProps<{
  filters: SearchFilters
}>()

const products = ref<Product[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const filteredProducts = computed(() => {
  let result = products.value

  if (props.filters.query) {
    const query = props.filters.query.toLowerCase()
    result = result.filter((p) => p.title.toLowerCase().includes(query))
  }

  if (props.filters.minPrice !== null) {
    result = result.filter((p) => p.price >= props.filters.minPrice!)
  }

  if (props.filters.maxPrice !== null) {
    result = result.filter((p) => p.price <= props.filters.maxPrice!)
  }

  return result
})

const loadProducts = async () => {
  loading.value = true
  error.value = null
  try {
    products.value = await productService.getAllProducts()
  } catch (err) {
    error.value = 'Ошибка загрузки товаров'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <div class="product-list">
    <div v-if="loading" class="loading">Загрузка товаров...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="filteredProducts.length === 0" class="empty">
      Товары не найдены
    </div>
    <div v-else class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <img :src="product.image" :alt="product.title" class="product-image" />
        <div class="product-info">
          <h3 class="product-title">{{ product.title }}</h3>
          <p class="product-category">{{ product.category }}</p>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-footer">
            <span class="product-price">${{ product.price.toFixed(2) }}</span>
            <div v-if="product.rating" class="product-rating">
              ⭐ {{ product.rating.rate }} ({{ product.rating.count }})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-list {
  padding: 2rem;
  max-width: 1280px;
  margin: 0 auto;
}

.loading,
.error,
.empty {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #e74c3c;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.product-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: contain;
  background: #f5f5f5;
  padding: 1rem;
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-category {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #667eea;
  text-transform: capitalize;
}

.product-description {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  color: #666;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.product-rating {
  font-size: 0.9rem;
  color: #666;
}
</style>

