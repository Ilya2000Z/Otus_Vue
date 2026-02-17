<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productService } from '../services/api'
import { useCart } from '../composables/useCart'
import type { Product } from '../types'

const route = useRoute()
const router = useRouter()
const { addToCart } = useCart()

const product = ref<Product | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const loadProduct = async () => {
  const productId = Number(route.params.id)
  if (isNaN(productId)) {
    error.value = 'Неверный ID товара'
    return
  }

  loading.value = true
  error.value = null
  try {
    product.value = await productService.getProductById(productId)
  } catch (err) {
    error.value = 'Ошибка загрузки товара'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const handleAddToCart = () => {
  if (product.value) {
    addToCart(product.value)
    alert('Товар добавлен в корзину!')
  }
}

onMounted(() => {
  loadProduct()
})
</script>

<template>
  <div class="product-detail-page">
    <div class="back-button">
      <button class="back-btn" @click="router.push('/')">← Назад к каталогу</button>
    </div>

    <div v-if="loading" class="loading">Загрузка товара...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="product" class="product-detail">
      <div class="product-detail-container">
        <div class="product-image-section">
          <img :src="product.image" :alt="product.title" class="product-detail-image" />
        </div>
        <div class="product-info-section">
          <h1 class="product-detail-title">{{ product.title }}</h1>
          <p class="product-detail-category">{{ product.category }}</p>
          <div v-if="product.rating" class="product-detail-rating">
            ⭐ {{ product.rating.rate }} ({{ product.rating.count }} отзывов)
          </div>
          <p class="product-detail-description">{{ product.description }}</p>
          <div class="product-detail-price">${{ product.price.toFixed(2) }}</div>
          <button class="add-to-cart-btn" @click="handleAddToCart">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem 0;
}

.back-button {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 1rem;
}

.back-btn {
  padding: 0.5rem 1rem;
  background: white;
  border: 2px solid #667eea;
  border-radius: 8px;
  color: #667eea;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.back-btn:hover {
  background: #667eea;
  color: white;
}

.loading,
.error {
  text-align: center;
  padding: 4rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #e74c3c;
}

.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.product-detail-container {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.product-image-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-detail-image {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  background: #f5f5f5;
  border-radius: 12px;
  padding: 2rem;
}

.product-info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.product-detail-title {
  margin: 0;
  font-size: 2rem;
  color: #333;
  line-height: 1.2;
}

.product-detail-category {
  margin: 0;
  font-size: 1.1rem;
  color: #667eea;
  text-transform: capitalize;
  font-weight: 600;
}

.product-detail-rating {
  font-size: 1.1rem;
  color: #666;
}

.product-detail-description {
  margin: 0;
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
}

.product-detail-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
}

.add-to-cart-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.add-to-cart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

@media (max-width: 968px) {
  .product-detail-container {
    grid-template-columns: 1fr;
  }
}
</style>


