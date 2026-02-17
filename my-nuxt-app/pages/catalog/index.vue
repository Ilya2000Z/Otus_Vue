<template>
  <div class="page catalog">
    <h1>Каталог</h1>
    <div class="filters">
      <button
        v-for="cat in categories"
        :key="cat"
        :class="['btn', { active: category === cat }]"
        @click="category = cat"
      >
        {{ cat === 'all' ? 'Все' : cat }}
      </button>
    </div>
    <div v-if="pending" class="loading">Загрузка...</div>
    <ul v-else class="product-list">
      <li v-for="product in products" :key="product.id" class="product-card">
        <NuxtLink :to="`/catalog/${product.id}`" class="product-link">
          <span class="product-title">{{ product.title }}</span>
          <span class="product-price">{{ formatPrice(product.price) }}</span>
        </NuxtLink>
        <button type="button" class="btn-add" @click="addToCart(product)">
          В корзину
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/composables/useGraphQL'

const category = ref<string>('all')
const categories = ['all', 'tech', 'wear']

const { getProducts } = useGraphQL()
const cartStore = useCartStore()

const { data: products, pending } = await useAsyncData(
  'catalog-products',
  () => getProducts(category.value === 'all' ? undefined : category.value),
  { watch: [category] }
)

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}

function addToCart(product: Product) {
  cartStore.addItem(
    { id: product.id, title: product.title, price: product.price },
    1
  )
}
</script>

<style scoped>
.catalog h1 {
  margin-bottom: 1rem;
}
.filters {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}
.btn {
  padding: 0.5rem 1rem;
  background: #27272a;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  color: #e4e4e7;
  cursor: pointer;
  font-size: 0.875rem;
}
.btn:hover,
.btn.active {
  background: #3f3f46;
  border-color: #a78bfa;
}
.loading {
  color: #71717a;
}
.product-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
.product-card {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #18181b;
  border: 1px solid #27272a;
  border-radius: 12px;
}
.product-link {
  flex: 1;
  margin-bottom: 0.75rem;
}
.product-link:hover {
  text-decoration: none;
}
.product-title {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}
.product-price {
  color: #a78bfa;
  font-size: 1.125rem;
}
.btn-add {
  margin-top: auto;
  padding: 0.5rem 1rem;
  background: #a78bfa;
  color: #0f0f12;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}
.btn-add:hover {
  background: #c4b5fd;
}
</style>
