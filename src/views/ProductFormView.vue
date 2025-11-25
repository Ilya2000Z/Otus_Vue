<script setup lang="ts">
import { useRouter } from 'vue-router'
import ProductForm from '../components/ProductForm.vue'
import type { ProductFormData } from '../types'

const router = useRouter()

const handleProductCreated = (product: ProductFormData) => {
  console.log('Новый товар создан:', product)
  // Здесь можно добавить логику сохранения товара
}
</script>

<template>
  <div class="product-form-view">
    <div class="back-button">
      <button class="back-btn" @click="router.push('/')">← Назад к товарам</button>
    </div>
    <ProductForm @product-created="handleProductCreated" />
  </div>
</template>

<style scoped>
.product-form-view {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 2rem;
}

.back-button {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 2rem;
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
</style>

