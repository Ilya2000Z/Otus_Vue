<template>
  <div class="page product-detail">
    <div v-if="pending" class="loading">Загрузка...</div>
    <div v-else-if="product" class="detail">
      <NuxtLink to="/catalog" class="back">← Каталог</NuxtLink>
      <h1>{{ product.title }}</h1>
      <p class="price">{{ formatPrice(product.price) }}</p>
      <p v-if="product.description" class="description">{{ product.description }}</p>
      <p class="category">Категория: {{ product.category }}</p>
      <button type="button" class="btn-add" @click="addToCart">В корзину</button>
    </div>
    <div v-else class="error">Товар не найден</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = computed(() => route.params.id as string)

const { getProduct } = useGraphQL()
const cartStore = useCartStore()

const { data: product, pending } = await useAsyncData(
  () => `product-${id.value}`,
  () => getProduct(id.value)
)

function formatPrice(price: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price)
}

function addToCart() {
  if (product.value) {
    cartStore.addItem(
      { id: product.value.id, title: product.value.title, price: product.value.price },
      1
    )
  }
}
</script>

<style scoped>
.product-detail {
  max-width: 560px;
}
.loading, .error {
  color: #71717a;
}
.back {
  display: inline-block;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}
.detail h1 {
  margin-bottom: 0.5rem;
}
.price {
  font-size: 1.5rem;
  color: #a78bfa;
  margin-bottom: 1rem;
}
.description {
  color: #a1a1aa;
  margin-bottom: 0.5rem;
}
.category {
  font-size: 0.875rem;
  color: #71717a;
  margin-bottom: 1.5rem;
}
.btn-add {
  padding: 0.75rem 1.5rem;
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
